import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import * as contract from '../lib/enquiry-contract.ts';

// Exercise the actual submit handler with a mocked transport: no Portal writes.
function mount(send = async () => ({ ok: true, submission_id: 'test-receipt' })) {
  const hooks = [], sent = [];
  let cursor = 0;
  const compiledModule = { exports: {} };
  const jsx = (type, props) => ({ type, props });
  const source = fs.readFileSync(new URL('../app/(website)/contact/ContactForm.tsx', import.meta.url), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(code, {
    exports: compiledModule.exports, module: compiledModule, setTimeout: () => {},
    FormData: class { constructor(form) { return new Map(Object.entries(form.fields)); } },
    require(name) {
      if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx };
      if (name === 'react') return {
        useEffect: () => {},
        useRef: value => { const i = cursor++; return hooks[i] ??= { current: value }; },
        useState: value => { const i = cursor++; if (!(i in hooks)) hooks[i] = value; return [hooks[i], next => { hooks[i] = typeof next === 'function' ? next(hooks[i]) : next; }]; },
      };
      if (name === 'next/navigation') return { useRouter: () => ({ push: () => {} }) };
      if (name.endsWith('FormStepHeading')) return { default: 'step-heading' };
      if (name.endsWith('enquiry-contract')) return contract;
      if (name.endsWith('enquiry-client')) return {
        enquiryRequestId: () => '12345678-1234-1234-1234-123456789012',
        enquiryTracking: () => ({}), clearEnquiryRequestId: () => {}, recordAcceptedLead: () => {},
        sendEnquiry: async payload => { sent.push(payload); return send(payload); },
      };
      throw new Error(name);
    },
  });
  const render = () => { cursor = 0; return compiledModule.exports.default({ formName: 'Test enquiry', formSlug: 'contact', intent: 'technical-review' }); };
  const form = { reportValidity: () => true, fields: { name: 'Test Person', email: 'test@example.com', service: 'crm', message: 'Please help organise enquiries.', budget_range: '' } };
  const submit = () => render().props.onSubmit({ preventDefault() {}, currentTarget: form });
  const fields = () => render().props.children.filter(child => child?.type === 'fieldset');
  return { render, submit, form, fields, sent };
}

test('Continue validates details and advances without sending or requiring consent', async () => {
  const view = mount();
  assert.equal(view.fields()[1].props.disabled, true);
  view.form.reportValidity = () => false;
  await view.submit();
  assert.equal(view.fields()[0].props.hidden, false);
  view.form.reportValidity = () => true;
  await view.submit();
  assert.equal(view.fields()[0].props.hidden, true);
  assert.equal(view.fields()[0].props.disabled, false, 'details remain available to FormData');
  assert.equal(view.fields()[1].props.hidden, false);
  assert.equal(view.sent.length, 0);
});

test('final submission enforces privacy and sends details with optional marketing declined', async () => {
  const view = mount();
  await view.submit();
  await view.submit();
  assert.equal(view.sent.length, 0, 'server contract also guards missing privacy');
  view.form.fields.privacy_consent = 'on';
  await view.submit();
  assert.equal(view.sent.length, 1);
  assert.equal(view.sent[0].fields.email, 'test@example.com');
  assert.equal(view.sent[0].fields.marketing_consent, 'false');
  assert.equal(view.sent[0].fields.intent, 'technical-review');
  assert.equal(view.render().props.role, 'status');
});

test('failed submission stays on consent and Back restores the details step', async () => {
  const view = mount(async () => { throw new Error('Temporary failure'); });
  await view.submit();
  view.form.fields.privacy_consent = 'on';
  await view.submit();
  assert.equal(view.fields()[1].props.hidden, false);
  const actions = view.render().props.children.find(child => child?.props?.className === 'form-step-actions');
  actions.props.children[0].props.onClick();
  assert.equal(view.fields()[0].props.hidden, false);
  assert.equal(view.form.fields.email, 'test@example.com');
});
