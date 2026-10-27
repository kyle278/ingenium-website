import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import * as contract from '../lib/enquiry-contract.ts';
import * as templatesModule from '../lib/website-templates.ts';

const templates = ['cleaning', 'landscaping', 'carpentry'].map((industry, i) => ({ id: `example-${i}`, industry, title: `Example ${i}`, description: 'Website preview', image: '/test.png', url: 'https://example.test' }));
const source = fs.readFileSync(new URL('../components/rebuild/TemplateGallery.tsx', import.meta.url), 'utf8');
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText;
function mount(send = async () => ({ ok: true, submission_id: 'receipt' }), storageFails = false) {
  const hooks = [], sent = [], storage = new Map();
  let cursor = 0;
  const compiledModule = { exports: {} };
  const jsx = (type, props) => ({ type, props });
  vm.runInNewContext(code, {
    Error, module: compiledModule, exports: compiledModule.exports, localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => { if (storageFails) throw Error('storage unavailable'); storage.set(key, value); } },
    FormData: class { constructor(form) { return new Map(Object.entries(form.fields).filter(([, value]) => value !== undefined)); } },
    require(name) {
      if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx };
      if (name === 'react') return {
        useState: value => { const i = cursor++; if (!(i in hooks)) hooks[i] = value; return [hooks[i], next => { hooks[i] = typeof next === 'function' ? next(hooks[i]) : next; }]; },
        useRef: value => { const i = cursor++; return hooks[i] ??= { current: value }; },
      };
      if (name.endsWith('website-templates')) return templatesModule;
      if (name.endsWith('enquiry-contract')) return contract;
      if (name.endsWith('FormStepHeading')) return { default: 'step-heading' };
      if (name.endsWith('enquiry-client')) return { enquiryRequestId: () => '11111111-1111-4111-8111-111111111111', enquiryTracking: () => ({}), clearEnquiryRequestId() {}, recordAcceptedLead() {}, sendEnquiry: async value => { sent.push(value); return send(value); } };
      if (name === '@radix-ui/react-dialog') return Object.fromEntries(['Root', 'Portal', 'Overlay', 'Content', 'Title', 'Description', 'Close'].map(name => [name, `Dialog.${name}`]));
      if (name === 'lucide-react') return { ArrowUpRight: 'icon', Check: 'icon', LayoutTemplate: 'icon', X: 'icon' };
      if (name === 'next/image') return { default: 'image' };
      if (name.endsWith('.css')) return {};
      throw Error(name);
    },
  });
  function render() { cursor = 0; return compiledModule.exports.default({ templates }); }
  function walk(node) { return !node || typeof node !== 'object' ? [] : [node, ...[node.props?.children].flat(Infinity).flatMap(walk)]; }
  function nodes() { return walk(render()); }
  function open(index) { nodes().filter(node => node.props?.className === 'template-card')[index].props.onClick({ currentTarget: { focus() {} } }); }
  function form() { return nodes().find(node => node.type === 'form'); }
  async function submit(fields = {}) { await form().props.onSubmit({ preventDefault() {}, currentTarget: { reportValidity: () => true, fields: { name: 'Test Person', email: 'test@example.test', privacy_consent: 'on', ...fields } } }); }
  return { render, nodes, open, form, submit, sent, storage };
}

test('actual gallery gates only the third unique view, including when saving storage fails', () => {
  for (const unavailable of [false, true]) {
    const view = mount(undefined, unavailable);
    view.open(0); assert.equal(view.form(), undefined);
    view.open(0); assert.equal(view.form(), undefined);
    view.open(1); assert.equal(view.form(), undefined);
    view.open(2); assert.ok(view.form());
    assert.equal(view.nodes().filter(node => node.type === 'iframe').length, 0, 'gated preview is not loaded');
  }
});

test('accepted submission unlocks the requested website and captures industry interest without marketing consent', async () => {
  const view = mount(); view.open(0); view.open(1); view.open(2);
  await view.submit();
  assert.equal(view.sent.length, 0, 'details step never sends');
  await view.submit();
  assert.equal(view.sent.length, 1);
  assert.equal(contract.validateEnquiry(view.sent[0]), null);
  assert.match(view.sent[0].fields.additional_goals, /Cleaning, Landscaping, Carpentry/);
  assert.equal(view.sent[0].fields.intent, 'template-gallery-access');
  assert.equal(view.sent[0].form_slug, 'template-gallery');
  assert.equal(view.sent[0].fields.marketing_consent, 'false');
  assert.equal(view.form(), undefined);
  assert.equal(view.nodes().filter(node => node.type === 'iframe').length, 1);
  const stored = JSON.parse(view.storage.get(templatesModule.TEMPLATE_ACCESS_KEY));
  assert.equal(stored.unlocked, true);
  assert.equal(JSON.stringify(stored).includes('test@example.test'), false, 'personal data never stored in browser access state');
});

test('receipt failure preserves the form and does not grant access', async () => {
  const view = mount(async () => { throw Error('Receipt unavailable'); });
  view.open(0); view.open(1); view.open(2); await view.submit(); await view.submit();
  assert.ok(view.form());
  assert.equal(view.nodes().find(node => node.props?.role === 'alert').props.children, 'Receipt unavailable');
  assert.equal(JSON.parse(view.storage.get(templatesModule.TEMPLATE_ACCESS_KEY)).unlocked, false);
});

test('missing privacy acknowledgement cannot send or unlock', async () => {
  const view = mount(); view.open(0); view.open(1); view.open(2);
  await view.submit();
  await view.submit({ privacy_consent: undefined });
  assert.equal(view.sent.length, 0);
  assert.ok(view.form());
});
