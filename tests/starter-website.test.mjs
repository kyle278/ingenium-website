import test from 'node:test';
import assert from 'node:assert/strict';
import { routeStarterLead, validateStarterFields, LEAD_LABELS } from '../lib/starter-website.ts';
import { validateEnquiry, NOTICE_VERSION, PRIVACY_NOTICE } from '../lib/enquiry-contract.ts';

const full = { team_size: '2–5', business_type: 'Trades and construction', main_need: "I don't have a website yet" };
const fields = (extra = {}) => ({ name: 'Mary Walsh', email: 'mary@walsh.ie', phone: '', team_size: '', business_type: '', main_need: '', details: '', privacy_consent: 'true', consent_version: NOTICE_VERSION, consent_text_snapshot: PRIVACY_NOTICE, marketing_consent: 'false', fill_ms: '12000', ...extra });

test('all three picks answered with a one-page need is a good fit', () => assert.equal(routeStarterLead(full), 'good-fit'));
test('shops, bookings and 26+ staff are bigger needs, checked before anything else', () => {
  assert.equal(routeStarterLead({ ...full, main_need: 'I need to sell or take bookings online' }), 'bigger-needs');
  assert.equal(routeStarterLead({ team_size: 'More than 25' }), 'bigger-needs');
});
test('skipped picks or "Something else" need a chat', () => {
  assert.equal(routeStarterLead({}), 'needs-chat');
  assert.equal(routeStarterLead({ ...full, business_type: '' }), 'needs-chat');
  assert.equal(routeStarterLead({ ...full, main_need: 'Something else' }), 'needs-chat');
});
test('tracker labels match the brief', () => assert.deepEqual(LEAD_LABELS, { 'good-fit': 'Hot', 'needs-chat': 'Warm', 'bigger-needs': 'Main package' }));

test('starter requires privacy acknowledgement and notice while marketing remains optional', () => {
  const payload = { request_id: '11111111-1111-4111-8111-111111111111', form_slug: 'starter-website', fields: fields() };
  assert.equal(validateEnquiry(payload), null);
  assert.equal(validateStarterFields(payload.fields), null);
  payload.fields.email = 'nope';
  assert.match(validateEnquiry(payload), /email/);
});
test('unlisted dropdown values and long details are rejected', () => {
  assert.match(validateStarterFields(fields({ team_size: '500' })), /team size/);
  assert.match(validateStarterFields(fields({ main_need: 'Something else', details: 'a'.repeat(301) })), /300/);
});
test('submissions faster than 3 seconds are rejected', () => {
  assert.ok(validateStarterFields(fields({ fill_ms: '900' })));
  assert.ok(validateStarterFields(fields({ fill_ms: undefined })));
});

 test('starter rejects missing privacy or stale consent notice', () => {
   const payload = { request_id: '11111111-1111-4111-8111-111111111111', form_slug: 'starter-website', fields: fields({ privacy_consent: 'false' }) };
   assert.match(validateEnquiry(payload), /Privacy Policy/);
   payload.fields = fields({ consent_version: 'old' });
   assert.match(validateEnquiry(payload), /Reload/);
 });
