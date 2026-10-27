import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
function harness(){
 let allowed=true;const calls=[],listeners={},storage=new Map(),forms=[{getAttribute:()=> 'contact'}];let intersection,mutation;
 const location={href:'https://www.ingeniumconsulting.net/book-a-call',pathname:'/book-a-call',origin:'https://www.ingeniumconsulting.net'};
 const context={URL,Element:class {},location,innerHeight:800,scrollY:1000,sessionStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v)},document:{body:{},documentElement:{scrollHeight:1800},querySelectorAll:()=>forms,addEventListener:(n,f)=>listeners[n]=f,removeEventListener:n=>delete listeners[n]},window:{addEventListener:(n,f)=>listeners[n]=f,removeEventListener:n=>delete listeners[n]},IntersectionObserver:class {constructor(fn){intersection=fn}observe(){}disconnect(){}},MutationObserver:class {constructor(fn){mutation=fn}observe(){}disconnect(){}},require:()=>({analyticsAllowed:()=>allowed,captureAttribution(){},portalIdentity:()=>({session_id:'session'}),trackPortalEvent:(...args)=>{if(allowed)calls.push(args)}})};
 const mod={exports:{}};vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/portal-page-tracking.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{...context,module:mod,exports:mod.exports});
 return {...mod.exports,calls,listeners,location,forms,allow:v=>allowed=v,visible:()=>intersection([{target:forms[0],isIntersecting:true}]),mutation:()=>mutation()};
}
test('tracking starts one session and page, observes forms, and cleans up listeners',()=>{const b=harness(),stop=b.startPortalPageTracking();assert.deepEqual(b.calls.map(c=>c[0]),['session_start','page_view']);b.visible();b.visible();assert.equal(b.calls.filter(c=>c[0]==='form_view').length,1);b.listeners.scroll();b.listeners.scroll();assert.equal(b.calls.filter(c=>c[0]==='scroll_depth').length,4);stop();assert.equal(Object.keys(b.listeners).length,0);b.startPortalPageTracking();assert.equal(b.calls.filter(c=>c[0]==='session_start').length,1);assert.equal(b.calls.filter(c=>c[0]==='page_view').length,1);b.location.pathname='/packages';b.startPortalPageTracking();assert.equal(b.calls.filter(c=>c[0]==='page_view').length,2);});
test('pending/rejected consent and private previews never start tracking',()=>{for(const mode of ['rejected','blog','editor']){const b=harness();if(mode==='rejected')b.allow(false);if(mode==='blog')b.location.pathname='/blog/preview/private';if(mode==='editor')b.location.href+='?__ingenium_editor=1';b.startPortalPageTracking();assert.equal(b.calls.length,0);assert.equal(Object.keys(b.listeners).length,0);}});
test('withdrawal stops optional events even before effect cleanup',()=>{const b=harness();b.startPortalPageTracking();const count=b.calls.length;b.allow(false);b.listeners.scroll();b.visible();assert.equal(b.calls.length,count);});
