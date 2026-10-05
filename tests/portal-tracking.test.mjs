import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import crypto from 'node:crypto';
import { sanitizeTracking } from '../lib/enquiry-contract.ts';
function storage() { const values = new Map(); return { getItem: k => values.get(k) ?? null, setItem: (k,v) => values.set(k,v), removeItem: k => values.delete(k), values }; }
function browser() {
 const localStorage=storage(),sessionStorage=storage(),calls=[],window={};
 const location={href:'https://www.ingeniumconsulting.net/starter-website?utm_source=facebook&utm_campaign=launch&email=private@example.test',pathname:'/starter-website'};
 const mod={exports:{}};
 const code=ts.transpileModule(fs.readFileSync('lib/enquiry-client.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 vm.runInNewContext(code,{module:mod,exports:mod.exports,localStorage,sessionStorage,window,location,document:{referrer:'https://example.test/?token=secret'},crypto,URL,Date,AbortSignal,fetch:async (...args)=>{calls.push(args);return {ok:true};},require(name){if(name==='./enquiry-contract')return {acceptedReceipt:()=>true};if(name==='./portalIntegration/public')return {PORTAL_SITE_ID:'site',PORTAL_TRACKING_ENDPOINT:'https://portal.test/events'};throw Error(name);}});
 return {...mod.exports,localStorage,sessionStorage,calls,window,location};
}
test('pending and rejected analytics create no identities or events and do not send campaign data',()=>{
 for(const choice of [null,'rejected']) {const b=browser();if(choice)b.localStorage.setItem(b.CONSENT_KEY,choice);b.trackPortalEvent('starter_form_open');b.recordAcceptedLead('receipt','starter-website');assert.equal(b.calls.length,0);assert.equal(b.sessionStorage.values.size,0);assert.deepEqual(Object.keys(b.enquiryTracking()).sort(),['source_url','submission_url']);}
});
test('consented campaign events and form attribution share canonical IDs and strip private query data',()=>{
 const b=browser();b.localStorage.setItem(b.CONSENT_KEY,'accepted');b.trackPortalEvent('starter_cta_click',{cta_position:'hero',email:'private@example.test'});
 const event=JSON.parse(b.calls[0][1].body);assert.equal(event.site_id,'site');assert.equal(event.events[0].event_type,'starter_cta_click');assert.equal(event.events[0].properties.utm_source,'facebook');assert.equal(event.events[0].properties.email,undefined);assert.equal(event.events[0].page_url,'https://www.ingeniumconsulting.net/starter-website');assert.equal(event.events[0].referrer,'https://example.test/');
 b.location.href='https://www.ingeniumconsulting.net/contact';b.location.pathname='/contact';const tracking=b.enquiryTracking();assert.equal(tracking.utm_campaign,'launch');assert.equal(tracking.visitor_id,event.visitor_id);assert.equal(tracking.session_id,event.session_id);assert.equal(sanitizeTracking(tracking).visitor_id,event.visitor_id);
});
test('withdrawal clears attribution and identities and prevents further events; accepted receipt deduplicates',()=>{
 const b=browser();b.localStorage.setItem(b.CONSENT_KEY,'accepted');b.recordAcceptedLead('receipt','starter-website');b.recordAcceptedLead('receipt','starter-website');assert.equal(b.calls.length,1);b.localStorage.setItem(b.CONSENT_KEY,'rejected');b.clearAttribution();b.trackPortalEvent('starter_form_open');assert.equal(b.calls.length,1);assert.equal(b.localStorage.getItem('ingenium-portal-visitor-v1'),null);assert.equal(b.sessionStorage.getItem('ingenium-portal-session-v1'),null);assert.equal(b.enquiryTracking().utm_campaign,undefined);
});
