import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import * as contract from '../lib/enquiry-contract.ts';
import * as packages from '../lib/business-packages.ts';

// Run the real component handlers with an isolated transport; never write Portal leads.
function mount(props = {}, send = async () => ({ ok: true, submission_id: 'test-receipt' })) {
  const hooks = [], sent = [], recorded = [], cleared = [];
  let cursor = 0;
  const mod = { exports: {} };
  const jsx = (type, props) => ({ type, props });
  const code = ts.transpileModule(fs.readFileSync('components/rebuild/CallRequestJourney.tsx', 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(code, { exports: mod.exports, module: mod, Date, Intl, require(name) {
    if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx, Fragment: 'fragment' };
    if (name === 'react') return {
      useEffect: () => {},
      useRef: value => { const i = cursor++; return hooks[i] ??= { current: value }; },
      useState: value => { const i = cursor++; if (!(i in hooks)) hooks[i] = typeof value === 'function' ? value() : value; return [hooks[i], next => { hooks[i] = typeof next === 'function' ? next(hooks[i]) : next; }]; },
    };
    if (name === './PackagePricing') return { PackagePrice: 'package-price' };
    if (name === 'next/link') return { default: 'link' };
    if (name === 'lucide-react') return new Proxy({}, { get: (_, key) => String(key) });
    if (name.endsWith('business-packages')) return packages;
    if (name.endsWith('enquiry-contract')) return contract;
    if (name.endsWith('enquiry-client')) return {
      enquiryRequestId: () => '11111111-1111-4111-8111-111111111111', enquiryTracking: () => ({}),
      clearEnquiryRequestId: intent => cleared.push(intent), recordAcceptedLead: (...args) => recorded.push(args),
      sendEnquiry: async payload => { sent.push(payload); return send(payload); },
    };
    throw new Error(name);
  } });
  const render = () => { cursor = 0; return mod.exports.default(props); };
  const nodes = (node, found = []) => {
    if (!node || typeof node !== 'object') return found;
    if (Array.isArray(node)) { node.forEach(child => nodes(child, found)); return found; }
    found.push(node); nodes(node.props?.children, found); return found;
  };
  const text = node => typeof node === 'string' || typeof node === 'number' ? String(node) : Array.isArray(node) ? node.map(text).join('') : node?.props ? text(node.props.children) : '';
  const find = predicate => nodes(render()).find(predicate);
  const button = label => find(node => node.type === 'button' && text(node) === label);
  const click = label => { const node = button(label); assert.ok(node, `Missing button ${label}`); node.props.onClick({ detail: 1 }); };
  const change = (name, value) => { const node = find(node => node.props?.name === name); assert.ok(node, `Missing ${name}`); node.props.onChange({ target: { value, checked: value } }); };
  const submit = (valid = true) => render().props.onSubmit({ preventDefault() {}, currentTarget: { reportValidity: () => valid } });
  const heading = () => find(node => node.props?.id === 'call-question').props.children;
  const details = async () => { await submit(); change('first_name', 'Test'); change('last_name', 'Owner'); change('phone', '+353 85 123 4567'); change('email', 'owner@example.test'); await submit(); };
  return { render, find, button, click, change, submit, heading, details, sent, recorded, cleared };
}

test('a choice advances once; timing and details wait for explicit valid Continue', async () => {
  const view = mount();
  assert.equal(view.heading(), 'What can we help with?');
  assert.equal(view.find(node => node.props?.name === 'email'), undefined);
  const choose = view.button('Starter Website').props.onClick;
  choose({ detail: 1 }); choose({ detail: 1 });
  assert.equal(view.heading(), 'When can we call you?');
  await view.submit(false);
  assert.equal(view.heading(), 'When can we call you?');
  const staleSubmit = view.render().props.onSubmit;
  await staleSubmit({ preventDefault() {}, currentTarget: { reportValidity: () => true } });
  await staleSubmit({ preventDefault() {}, currentTarget: { reportValidity: () => true } });
  assert.equal(view.heading(), 'Where can we reach you?');
  await view.submit(false);
  assert.equal(view.heading(), 'Where can we reach you?');
  assert.equal(view.sent.length, 0);
});

test('all routes require affirmative privacy; optional marketing is independent', async () => {
  for (const service of ['website', 'crm', 'connected', 'ecommerce', 'not-sure']) {
    const view = mount({ initialService: service });
    if (service === 'not-sure') view.click('Help deciding');
    await view.details();
    assert.equal(view.heading(), 'A quick privacy check.');
    assert.equal(view.find(node => node.props?.name === 'privacy_consent').props.checked, false);
    assert.equal(view.find(node => node.props?.name === 'marketing_consent').props.checked, false);
    await view.submit();
    assert.equal(view.sent.length, 0);
    view.change('privacy_consent', true);
    await view.submit();
    assert.equal(view.sent.length, 1);
    assert.equal(view.sent[0].fields.service, service);
    assert.equal(view.sent[0].fields.privacy_consent, 'true');
    assert.equal(view.sent[0].fields.marketing_consent, 'false');
    assert.equal(view.sent[0].fields.consent_text_snapshot, contract.PRIVACY_NOTICE);
    assert.equal(view.sent[0].fields.marketing_consent_text, contract.MARKETING_NOTICE);
    assert.equal(view.render().props.role, 'status');
    assert.equal(view.recorded.length, 1);
  }
});

test('Back preserves independent answers and switches to the newly selected package without a review', async () => {
  const view = mount({ initialPackage: '7-day-starter', initialService: 'crm' });
  assert.equal(view.heading(), 'When can we call you?', 'known package determines its service');
  view.change('preferred_date', '2099-10-26');
  await view.submit();
  view.change('first_name', 'Test'); view.change('last_name', 'Owner'); view.change('email', 'owner@example.test');
  view.change('phone', '+353 85 000 0000'); view.change('notes', 'A question for our call.');
  await view.submit();
  assert.equal(view.heading(), 'A quick privacy check.');
  assert.equal(view.find(node => node.type === 'dl'), undefined, 'no repeated answer summary');
  view.click('Back');
  assert.equal(view.find(node => node.props?.name === 'email').props.value, 'owner@example.test');
  view.click('Back');
  assert.equal(view.find(node => node.props?.name === 'preferred_date').props.value, '2099-10-26');
  view.click('Change topic'); view.click('CRM & Automation');
  assert.equal(view.heading(), 'When can we call you?');
  await view.submit();
  assert.equal(view.find(node => node.props?.className === 'call-offer'), undefined);
  assert.equal(view.find(node => node.props?.name === 'phone').props.value, '+353 85 000 0000');
  await view.submit(); view.change('privacy_consent', true); await view.submit();
  const fields = view.sent[0].fields;
  assert.equal(fields.package_interest, 'CRM & Automation');
  assert.equal(fields.package_id, 'crm-automation');
  assert.equal(fields.service, 'crm');
  assert.equal(fields.preferred_date, '2099-10-26');
  assert.equal(fields.phone, '+353 85 000 0000');
  assert.equal(fields.notes, 'A question for our call.');
  assert.ok(!fields.message.includes('7-Day Starter'));
});

test('package routes retain the correct offer and compatible topic changes keep it', async () => {
  for (const offer of packages.businessPackages) {
    const view = mount({ initialPackage: offer.id });
    view.click('Change topic');
    view.click(offer.service === 'website' ? 'Starter Website' : offer.service === 'crm' ? 'CRM & Automation' : 'Business Growth');
    await view.details();
    view.change('privacy_consent', true); await view.submit();
    assert.equal(view.sent[0].fields.package_interest, offer.name);
    assert.equal(view.sent[0].fields.service, offer.service);
  }
  assert.equal(mount({ initialPackage: 'invalid', initialService: 'invalid' }).heading(), 'What can we help with?');
});

test('held button keys cannot repeat navigation, while text entry keeps native key repeats', () => {
  const view = mount();
  const keydown = view.render().props.onKeyDown;
  for (const key of ['Enter', ' ']) {
    let prevented = false;
    keydown({ repeat: true, key, target: { closest: () => ({}) }, preventDefault() { prevented = true; } });
    assert.equal(prevented, true);
    prevented = false;
    keydown({ repeat: true, key, target: { closest: () => null }, preventDefault() { prevented = true; } });
    assert.equal(prevented, false, 'typing and textarea newlines remain native');
  }
});

test('pending duplicate submissions are blocked; failure retains answers and request ID', async () => {
  let rejectSend;
  const view = mount({ initialService: 'website' }, () => new Promise((_, reject) => { rejectSend = reject; }));
  await view.details(); view.change('privacy_consent', true); view.change('marketing_consent', true);
  const pending = view.submit(); await view.submit();
  assert.equal(view.sent.length, 1);
  assert.equal(view.find(node => node.type === 'fieldset').props.disabled, true);
  assert.equal(view.recorded.length, 0);
  rejectSend(new Error('We couldn’t confirm receipt. Email us before sending again.')); await pending;
  assert.equal(view.heading(), 'A quick privacy check.');
  assert.equal(view.cleared.length, 0);
  view.click('Back');
  assert.equal(view.find(node => node.props?.name === 'email').props.value, 'owner@example.test');
  await view.submit();
  assert.equal(view.find(node => node.props?.name === 'marketing_consent').props.checked, true);
  const retry = view.submit();
  assert.equal(view.sent[1].request_id, view.sent[0].request_id);
  rejectSend(new Error('Still uncertain')); await retry;
  assert.equal(view.recorded.length, 0);
});

test('callback rejects missing phone before consent and preserves separately entered names', async () => {
  const view = mount({ initialService: 'website' }); await view.submit();
  view.change('first_name', 'Mary Jane'); view.change('last_name', "Ó Néill Walsh");
  view.change('email', 'owner@example.test'); await view.submit();
  assert.equal(view.heading(), 'Where can we reach you?');
  view.change('phone', 'call me'); await view.submit();
  assert.equal(view.heading(), 'Where can we reach you?');
  view.change('phone', '+353 85 123 4567'); view.change('email', ''); await view.submit();
  view.change('privacy_consent', true); await view.submit();
  assert.equal(view.sent.length, 1);
  assert.equal(view.sent[0].fields.first_name, 'Mary Jane');
  assert.equal(view.sent[0].fields.last_name, "Ó Néill Walsh");
  assert.equal(view.sent[0].fields.name, "Mary Jane Ó Néill Walsh");
  assert.equal(view.sent[0].fields.email, '');
  assert.ok(view.sent[0].fields.message.includes('+353 85 123 4567'));
});

test('declining marketing discards an invalid opt-in address and keeps a phone-only request valid', async () => {
  const view = mount({ initialService: 'website' }); await view.details();
  view.click('Back'); view.change('email', ''); await view.submit();
  view.change('marketing_consent', true); view.change('marketing_email', 'invalid');
  view.change('marketing_consent', false); view.change('privacy_consent', true); await view.submit();
  assert.equal(view.sent.length, 1);
  assert.equal(view.sent[0].fields.email, '');
  assert.equal(view.sent[0].fields.marketing_consent, 'false');
  assert.equal(view.sent[0].fields.marketing_email, undefined);
});
