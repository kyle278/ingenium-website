import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function runtime(snapshot) {
 const mod={exports:{}};
 const code=ts.transpileModule(fs.readFileSync('lib/portalIntegration/seo-runtime.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 vm.runInNewContext(code,{module:mod,exports:mod.exports,URL,AbortSignal,process:{env:{INGENIUM_SEO_SITE_KEY:'seo_test',INGENIUM_SEO_SNAPSHOT_BASE_URL:'https://cdn.example/site'}},fetch:async()=>Response.json({id:'00000000-0000-4000-8000-000000000001',revision:1,snapshot:{schema_version:1,site_key:'seo_test',pages:[],redirects:[],defaults:{}}}),require(name){
  if(name==='react')return {cache:fn=>fn};
  if(name==='next/headers')return {};
  if(name==='@/lib/seo')return {SITE_URL:'https://www.ingeniumconsulting.net',PRIVATE_PATHS:['/website-brief'],PRIVATE_PATH_PREFIXES:['/internal/'],buildMetadata:config=>({title:config.title,robots:config.noIndex?'noindex':'index'})};
  if(name==='./seo-adapter')return {pageSeo:()=>snapshot};
  throw Error(name);
 }});
 return mod.exports;
}
test('managed metadata preserves fallbacks while overriding reviewed fields',async()=>{
 const api=runtime({title:'Reviewed title',description:'Reviewed description'});
 const value=await api.withPortalSeo({title:'Old title',alternates:{canonical:'https://www.ingeniumconsulting.net/contact'},openGraph:{images:['existing-image']}},'/contact');
 assert.equal(value.title.absolute,'Reviewed title');assert.equal(value.description,'Reviewed description');assert.equal(value.openGraph.images[0],'existing-image');assert.equal(value.alternates.canonical,'https://www.ingeniumconsulting.net/contact');
});
test('private and confirmation pages cannot inherit portal index directives',async()=>{
 const api=runtime({title:'Public title',robots:'index,follow'}),base={title:'Private',robots:'noindex'};
 for(const path of ['/website-brief','/internal/revenue-calculator','/demo/confirmed','/api/ingenium/seo'])assert.equal(await api.withPortalSeo(base,path),base);
 const result=await api.buildManagedMetadata({path:'/private',title:'Private',noIndex:true});assert.equal(result.robots,'noindex');
});
test('managed structured data replaces matching schema identities and preserves other types',()=>{
 const api=runtime({});const value=api.mergeManagedSchemas([{'@type':'Organization',name:'Old'},{'@type':'BreadcrumbList',name:'Trail'}],{'@context':'https://schema.org','@graph':[{'@type':'Organization',name:'Reviewed'}]});
 assert.equal(value.length,2);assert.equal(value[0]['@type'],'BreadcrumbList');assert.equal(value[1]['@graph'][0].name,'Reviewed');
});
