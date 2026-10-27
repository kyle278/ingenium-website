import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEnquiry, validContactPhone, PRIVACY_NOTICE, NOTICE_VERSION } from '../lib/enquiry-contract.ts';

function request(intent) {
  return { request_id: '11111111-1111-4111-8111-111111111111', form_slug: 'contact', fields: {
    intent, first_name: 'Test', last_name: 'Owner', phone: '+353 85 123 4567', name: 'Test Owner', email: 'owner@example.test', service: 'website', message: 'A local business request.',
    budget_range: '', privacy_consent: 'true', marketing_consent: 'false', consent_version: NOTICE_VERSION,
    consent_text_snapshot: PRIVACY_NOTICE,
  } };
}
test('visibility checks need real business, service and town context', () => {
  const p = request('visibility-check');
  assert.match(validateEnquiry(p), /business name/);
  Object.assign(p.fields, { company: 'Test Business', trade: 'Electrician', town: 'Carlow' });
  assert.equal(validateEnquiry(p), null);
  p.fields.town = ' ';
  assert.match(validateEnquiry(p), /town/);
});
test('a call request accepts flexible scheduling and optional marketing declined', () => {
  assert.equal(validateEnquiry(request('free-call')), null);
});
test('call preferences reject past, impossible and unsupported date/time values', () => {
  const p = request('free-call');
  for (const date of ['2000-01-01', '2099-02-30', 'tomorrow']) {
    p.fields.preferred_date = date;
    assert.match(validateEnquiry(p), /future date/);
  }
  p.fields.preferred_date = '2099-10-26';
  p.fields.preferred_time = 'morning';
  assert.equal(validateEnquiry(p), null);
  p.fields.preferred_time = 'midnight';
  assert.match(validateEnquiry(p), /time preference/);
});
test('both request intents still require privacy and current notice evidence', () => {
  for (const intent of ['free-call', 'visibility-check']) {
    const p = request(intent);
    Object.assign(p.fields, { company: 'Test Business', trade: 'Plumber', town: 'Carlow' });
    p.fields.privacy_consent = 'false';
    assert.match(validateEnquiry(p), /acknowledge/);
    p.fields.privacy_consent = 'true';
    p.fields.consent_version = 'old';
    assert.match(validateEnquiry(p), /changed/);
  }
});

test('callback requires separate names and a phone; an email cannot replace the phone', () => {
  const p = request('free-call');
  for (const key of ['first_name', 'last_name', 'phone']) {
    const saved = p.fields[key]; p.fields[key] = '';
    assert.match(validateEnquiry(p), key === 'phone' ? /phone number/ : /first name and last name/);
    p.fields[key] = saved;
  }
  p.fields.email = '';
  assert.equal(validateEnquiry(p), null, 'callback does not require email');
  delete p.fields.email;
  assert.equal(validateEnquiry(p), null, 'omitted email does not need a fabricated value');
  p.fields.email = 'invalid';
  assert.match(validateEnquiry(p), /email address/, 'optional email is validated if supplied');
});

test('contact requirements follow delivery and the chosen marketing channel', () => {
  const callback = request('free-call'); callback.fields.email = ''; callback.fields.marketing_consent = 'true';
  assert.match(validateEnquiry(callback), /email address/, 'email opt-in needs an address');
  callback.fields.email = 'owner@example.test';
  assert.equal(validateEnquiry(callback), null);
  const report = request('visibility-check');
  Object.assign(report.fields, { company: 'Test Business', trade: 'Electrician', town: 'Carlow', email: '' });
  assert.match(validateEnquiry(report), /email address/, 'a phone cannot replace an emailed report address');
  const general = request('project-enquiry'); general.fields.email = '';
  assert.match(validateEnquiry(general), /email address/, 'callback exception is restricted to its intent');
});

test('phone validation accepts normal international formats and rejects unusable values', () => {
  for (const phone of ['+353 85 123 4567', '0851234567', '+44 (0)20 7946 0958', '(01) 234-5678', '+1 202.555.0123']) assert.equal(validContactPhone(phone), true, phone);
  for (const phone of ['', 'call me', '123', '+353 85 abc 1234', '+1234567890123456', '---1234567']) assert.equal(validContactPhone(phone), false, phone);
});

test('separate name fields accept one-character and multiword names', () => {
  const p = request('free-call');
  p.fields.first_name = 'Á'; p.fields.last_name = "Ó Néill"; p.fields.name = 'Á Ó Néill';
  assert.equal(validateEnquiry(p), null);
  p.fields.first_name = '李'; p.fields.last_name = '王'; p.fields.name = '李 王';
  assert.equal(validateEnquiry(p), null);
});
