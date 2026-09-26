import test from 'node:test';
import assert from 'node:assert/strict';
import { validateEnquiry, acceptedReceipt, PRIVACY_NOTICE, NOTICE_VERSION } from '../lib/enquiry-contract.ts';
const payload = () => ({ request_id:'11111111-1111-4111-8111-111111111111',form_slug:'contact',fields:{name:'Test Person', email:'test@example.test',service:'connected',message:'A website and CRM enquiry.',budget_range:'2000-5000',privacy_consent:'true',marketing_consent:'false',consent_version:NOTICE_VERSION,consent_text_snapshot:PRIVACY_NOTICE}});
test('valid enquiry does not require marketing consent or business name',()=>assert.equal(validateEnquiry(payload()),null));
test('missing acknowledgement is rejected independently of browser validation',()=>{const p=payload();p.fields.privacy_consent='false';assert.match(validateEnquiry(p),/acknowledge/)});
test('malformed email cannot become a lead',()=>{const p=payload();p.fields.email='not-an-email';assert.match(validateEnquiry(p),/email/)});
test('unsupported service and legacy enterprise budget rejected',()=>{const p=payload();p.fields.service='secret';assert.match(validateEnquiry(p),/choose/);p.fields.service='crm';p.fields.budget_range='under25k';assert.match(validateEnquiry(p),/budget/)});
test('wrong notice snapshot cannot be silently accepted',()=>{const p=payload();p.fields.consent_text_snapshot='other notice';assert.match(validateEnquiry(p),/changed/)});
test('honeypot-style accepted false and generic HTTP-success bodies are not accepted receipts',()=>{assert.equal(acceptedReceipt({ok:true,accepted:false}),false);assert.equal(acceptedReceipt({ok:true}),false);assert.equal(acceptedReceipt({ok:true,accepted:false,submission_id:'fake'}),false);assert.equal(acceptedReceipt({ok:true,submission_id:'record-id'}),true)});
test('oversized fields and malformed object are rejected',()=>{assert.ok(validateEnquiry(null));const p=payload();p.fields.message='a'.repeat(13000);assert.ok(validateEnquiry(p))});
test('private brief uses same validated essential contact boundary',()=>{const p=payload();p.form_slug='website-project-brief';Object.assign(p.fields,{company:'Test Ltd',business_summary:'Local services',current_website_status:'None',primary_goal:'Enquiries',required_pages:'Home, contact',timeline:'This quarter',accuracy_confirmation:'true'});assert.equal(validateEnquiry(p),null);p.fields.privacy_consent='false';assert.match(validateEnquiry(p),/acknowledge/)});

import { sanitizeTracking } from '../lib/enquiry-contract.ts';
test('tracking removes secrets and arbitrary properties while retaining campaign taxonomy',()=>{
  const clean=sanitizeTracking({submission_url:'https://example.test/contact?email=person@example.test&token=secret#private',utm_source:'linkedin',utm_campaign:'ie_connected_launch',utm_content:'person@example.test',token:'secret',page_title:'private'});
  assert.deepEqual(clean,{submission_url:'https://example.test/contact',utm_source:'linkedin',utm_campaign:'ie_connected_launch'});
});
test('tracking rejects executable URLs and malformed campaign values',()=>assert.deepEqual(sanitizeTracking({source_url:'javascript:alert(1)',cid:'<script>',utm_medium:'cpc'}),{utm_medium:'cpc'}));
