import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import * as contract from '../lib/enquiry-contract.ts';
import * as starter from '../lib/starter-website.ts';

function compile(file, require, extra = {}) {
  const mod = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(code, { module: mod, exports: mod.exports, require, ...extra }); return mod.exports;
}
export const journeys = compile('lib/form-journeys.ts', name => name.endsWith('enquiry-contract') ? contract : starter);
export function mount(kind = 'enquiry', props = {}, send = async () => ({ ok: true, submission_id: 'confirmed-receipt' })) {
  const hooks = [], effects = [], sent = [], cleared = [], pushes = [];
  let cursor = 0, now = Date.now(), title = 'Test page';
  const jsx = (type, props) => typeof type === 'function' ? type(props) : ({ type, props });
  const component = compile('components/forms/GuidedEnquiry.tsx', name => {
    if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx, Fragment: 'fragment' };
    if (name === 'react') return {
      useId: () => { cursor++; return 'test-form'; },
      useRef: v => { const i = cursor++; return hooks[i] ??= { current: v }; },
      useState: v => { const i = cursor++; if (!(i in hooks)) hooks[i] = typeof v === 'function' ? v() : v; return [hooks[i], next => { hooks[i] = typeof next === 'function' ? next(hooks[i]) : next; }]; },
      useEffect: (fn, deps) => { const i = cursor++, old = hooks[i]; if (!old || !deps || deps.some((v, j) => old[j] !== v)) { hooks[i] = deps; effects.push(fn); } },
    };
    if (name === 'next/navigation') return { useRouter: () => ({ push: path => pushes.push(path) }) };
    if (name === 'next/link') return { default: 'a' };
    if (name === 'lucide-react') return new Proxy({}, { get: (_, key) => String(key) });
    if (name.endsWith('form-journeys')) return journeys;
    if (name.endsWith('enquiry-contract')) return contract;
    if (name.endsWith('starter-website')) return starter;
    if (name.endsWith('enquiry-client')) return { enquiryRequestId: () => '11111111-1111-4111-8111-111111111111', enquiryTracking: () => ({}), clearEnquiryRequestId: key => cleared.push(key), recordAcceptedLead() {}, sendEnquiry: async payload => { sent.push(payload); return send(payload); } };
    throw Error(name);
  }, { Date: { now: () => now }, URLSearchParams, location: { search: '' }, window: { matchMedia: () => ({ matches: false }) }, document: { get title() { return title; }, set title(v) { title = v; } } });
  function render() { cursor = 0; const result = component.default({ kind, formName: 'Test request', formSlug: kind === 'brief' ? 'website-project-brief' : kind === 'starter' ? 'starter-website' : kind === 'template' ? 'template-gallery' : 'contact', ...props }); while (effects.length) effects.shift()(); return result; }
  const walk = node => !node || typeof node !== 'object' ? [] : [node, ...[node.props?.children].flat(Infinity).flatMap(walk)];
  const text = node => typeof node === 'string' ? node : node?.props ? [node.props.children].flat(Infinity).map(text).join('') : '';
  const nodes = () => walk(render());
  function fill(name, value) { const node = nodes().find(n => n.props?.name === name); if (!node) throw Error('No active field: ' + name); node.props.onChange({ target: { value, checked: value } }); }
  function click(label, detail = 1) { const button = nodes().find(n => n.type === 'button' && text(n) === label); if (!button) throw Error('No active button: ' + label); button.props.onClick({ detail }); render(); }
  async function submit() { const form = nodes().find(n => n.type === 'form'); if (!form) throw Error('No active form'); await form.props.onSubmit({ preventDefault() {}, currentTarget: { reportValidity: () => true } }); render(); }
  function contact() { fill('first_name', 'Mary Jane'); fill('last_name', 'Ó Néill Walsh'); fill('email', 'owner@example.test'); }
  return { render, nodes, fill, click, submit, contact, sent, cleared, pushes, step: () => nodes().find(n => n.type === 'form')?.props['data-step'], error: () => nodes().find(n => n.props?.role === 'alert')?.props.children, advanceTime: ms => { now += ms; } };
}
