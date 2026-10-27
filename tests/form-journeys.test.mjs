import test from 'node:test';
import assert from 'node:assert/strict';
import { journeys, mount } from './guided-form-harness.mjs';
import { validateEnquiry } from '../lib/enquiry-contract.ts';

test('visibility collects business context before identity and requires an email for the report', async () => {
  const v = mount('visibility');
  assert.equal(v.step(), 'business'); assert.equal(v.nodes().some(n => n.props?.name === 'first_name'), false);
  v.fill('company', 'Test Business'); v.fill('trade', 'Electrician'); await v.submit();
  v.fill('town', 'Carlow'); await v.submit();
  v.fill('first_name', 'É'); v.fill('last_name', 'Ó'); await v.submit();
  assert.equal(v.step(), 'contact'); assert.match(v.error(), /email/);
  v.fill('email', 'owner@example.test'); await v.submit(); assert.equal(v.sent.length, 0);
  v.fill('privacy_consent', true); await v.submit();
  const p = v.sent[0]; assert.equal(validateEnquiry(p), null); assert.equal(p.fields.name, 'É Ó'); assert.equal(p.fields.email, 'owner@example.test'); assert.equal(p.fields.phone, undefined); assert.equal(p.fields.marketing_consent, 'false'); assert.match(p.fields.message, /Electrician.*Carlow/);
});

test('brief branching clears a previous URL, preserves independent answers and uses explicit multi-select progression', async () => {
  let answers = journeys.updateAnswer({}, 'current_website_status', 'Refresh existing site');
  answers = journeys.updateAnswer(answers, 'website_url', 'https://old.example.test');
  answers = journeys.updateAnswer(answers, 'company', 'Keep this business');
  answers = journeys.updateAnswer(answers, 'current_website_status', 'Brand new website');
  assert.equal(answers.website_url, undefined); assert.equal(answers.company, 'Keep this business');
  assert.equal(journeys.applicableQuestions('brief', answers).some(q => q.id === 'existing-site'), false);
  const v = mount('brief'); v.click('A new website'); v.fill('company', 'Local Business'); v.fill('business_summary', 'A local business doing useful work.'); await v.submit();
  v.click('Get enquiries'); v.fill('required_pages', 'Home, services and contact'); await v.submit();
  assert.equal(v.step(), 'features');
  const option = v.nodes().find(n => n.type === 'input' && n.props.value === 'CRM integration'); option.props.onChange();
  assert.equal(v.step(), 'features'); await v.submit(); v.click('Just exploring'); v.contact(); await v.submit();
  v.fill('privacy_consent', true); await v.submit(); assert.equal(v.sent.length, 0); assert.match(v.error(), /accurate/);
  v.fill('accuracy_confirmation', true); await v.submit(); const p = v.sent[0];
  assert.equal(validateEnquiry(p), null); assert.equal(p.fields.requested_features, 'CRM integration'); assert.equal(p.fields.feature_count, '1'); assert.equal(p.fields.pages_summary, 'Home, services and contact'); assert.equal(p.fields.website_url, undefined);
});

test('template access waits for an accepted receipt and retains consent and names on failure', async () => {
  let accepted = 0;
  const v = mount('template', { onAccepted: () => { accepted++; }, extraFields: { service: 'website', intent: 'template-gallery-access', message: 'A request to explore website templates.' } }, async () => { throw Error('Receipt unavailable'); });
  v.contact(); await v.submit(); assert.equal(v.step(), 'consent'); assert.equal(v.sent.length, 0);
  v.fill('privacy_consent', true); v.fill('marketing_consent', true); await v.submit();
  assert.equal(accepted, 0); assert.equal(v.step(), 'consent'); assert.equal(v.cleared.length, 0); assert.match(v.error(), /receipt/i);
  v.click('Back'); assert.equal(v.nodes().find(n => n.props?.name === 'last_name').props.value, 'Ó Néill Walsh'); await v.submit();
  assert.equal(v.nodes().find(n => n.props?.name === 'marketing_consent').props.checked, true);
});

test('all non-callback contracts reject missing independent names and unusable supplied phone numbers', () => {
  const fields = journeys.buildJourneyFields('visibility', { company: 'Local Business', trade: 'Electrician', town: 'Carlow', first_name: 'A', last_name: 'B', email: 'a@example.test', privacy_consent: 'true' });
  const p = { request_id: '11111111-1111-4111-8111-111111111111', form_slug: 'contact', fields };
  assert.equal(validateEnquiry(p), null); p.fields.first_name = ''; assert.match(validateEnquiry(p), /first name/); p.fields.first_name = 'A'; p.fields.phone = 'abc'; assert.match(validateEnquiry(p), /phone/);
});
