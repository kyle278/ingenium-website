import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import * as contract from '../lib/enquiry-contract.ts';
import * as starter from '../lib/starter-website.ts';
function mount(send=async()=>({ok:true,submission_id:'receipt',lead_route:'needs-chat'})) {
 const hooks=[],sent=[];let cursor=0;const mod={exports:{}};const jsx=(type,props)=>({type,props});
 const code=ts.transpileModule(fs.readFileSync('components/starter/QualifyDialog.tsx','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
 vm.runInNewContext(code,{module:mod,exports:mod.exports,location:{pathname:'/starter-website'},Date,requestAnimationFrame:()=>{},require(name){
 if(name==='react/jsx-runtime')return {jsx,jsxs:jsx,Fragment:'fragment'};
 if(name==='react')return {useEffect:()=>{},useId:()=> 'id',useRef:v=>{const i=cursor++;return hooks[i]??={current:v};},useState:v=>{const i=cursor++;if(!(i in hooks))hooks[i]=v;return [hooks[i],next=>{hooks[i]=typeof next==='function'?next(hooks[i]):next;}];}};
 if(name==='lucide-react')return {AlertCircle:'alert',X:'close'};
 if(name.endsWith('enquiry-contract'))return contract;
 if(name.endsWith('starter-website'))return starter;
 if(name.endsWith('FormStepHeading'))return {default:'heading'};
 if(name==='./track')return {trackStarter:()=>{}};
 if(name.endsWith('enquiry-client'))return {clearEnquiryRequestId:()=>{},enquiryRequestId:()=> '11111111-1111-4111-8111-111111111111',enquiryTracking:()=>({}),recordAcceptedLead:()=>{},sendEnquiry:async payload=>{sent.push(payload);return send(payload);}};
 throw Error(name);
 }});
 const render=()=>{cursor=0;return mod.exports.default({open:true,position:'hero',onClose:()=>{},onSubmitted:()=>{}});};
 function nodes(node,result=[]) {if(!node||typeof node!=='object')return result;if(Array.isArray(node)){node.forEach(n=>nodes(n,result));return result;}result.push(node);nodes(node.props?.children,result);return result;}
 const find=predicate=>nodes(render()).find(predicate);
 const change=(name,value)=>find(n=>n.props?.name===name).props.onChange({target:{value,checked:value}});
 const submit=()=>find(n=>n.type==='form').props.onSubmit({preventDefault(){}});
 return {render,find,change,submit,sent};
}
test('starter details advance without sending, required privacy blocks sending, optional marketing can be declined',async()=>{
 const b=mount();b.change('name','Test Person');b.change('email','test@example.test');await b.submit();assert.equal(b.sent.length,0);assert.equal(b.find(n=>n.type==='fieldset'&&n.props['aria-label']==='Privacy and consent').props.hidden,false);await b.submit();assert.equal(b.sent.length,0);b.change('privacy_consent',true);await b.submit();assert.equal(b.sent.length,1);const f=b.sent[0].fields;assert.equal(f.privacy_consent,'true');assert.equal(f.marketing_consent,'false');assert.equal(f.consent_text_snapshot,contract.PRIVACY_NOTICE);assert.equal(f.marketing_consent_text,starter.MARKETING_TEXT);assert.equal(f.first_name,'Test');assert.equal(b.sent[0].form_slug,'starter-website');
});
test('starter failure preserves consent step, marketing choice and details through Back',async()=>{
 const b=mount(async()=>{throw Error('Temporary failure');});b.change('name','Test Person');b.change('email','test@example.test');await b.submit();b.change('privacy_consent',true);b.change('marketing_consent',true);await b.submit();assert.equal(b.sent[0].fields.marketing_consent,'true');assert.equal(b.find(n=>n.type==='fieldset'&&n.props['aria-label']==='Privacy and consent').props.hidden,false);b.find(n=>n.type==='button'&&n.props.children==='Back to details').props.onClick();assert.equal(b.find(n=>n.props?.name==='email').props.value,'test@example.test');
});
