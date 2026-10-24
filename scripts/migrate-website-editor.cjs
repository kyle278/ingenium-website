const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const ts=require('typescript');
const root=process.cwd(),files=[];
function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,item.name);if(item.isDirectory())walk(p);else if(item.name==='page.tsx'&&!p.includes(path.sep+'blog'+path.sep)&&!p.includes(path.sep+'internal'+path.sep)&&!p.includes(path.sep+'website-brief'+path.sep)&&!p.includes(path.sep+'confirmed'+path.sep))files.push(p);}}
walk(path.join(root,'app/(website)'));
for(const f of ['app/(website)/components/SiteNav.tsx','app/(website)/components/SiteFooter.tsx','components/rebuild/OfferPage.tsx','components/rebuild/TeamGrid.tsx'])files.push(path.join(root,f));
for(const f of ['app/(website)/components/PolicyPage.tsx','app/(website)/components/FaqAccordion.tsx','app/(website)/components/ServiceFaqSection.tsx','app/(website)/components/sitePrimitives.tsx','components/rebuild/EnquiryJourney.tsx'])if(fs.existsSync(path.join(root,f)))files.push(path.join(root,f));
const tags=new Set(['h1','h2','h3','h4','h5','h6','p','span','strong','em','li','summary','a','Link','button']);
const report=fs.existsSync('lib/website-editor/migration-manifest.json')?JSON.parse(fs.readFileSync('lib/website-editor/migration-manifest.json','utf8')).files:[];
for(const file of files){
  const original=fs.readFileSync(file,'utf8');if(original.includes('@/components/website-editor/Editable'))continue;
  const relative=path.relative(root,file).replaceAll('\\','/'),prefix='r'+crypto.createHash('sha256').update(relative).digest('hex').slice(0,10),sf=ts.createSourceFile(file,original,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX),edits=[],used=new Set();
  const id=n=>prefix+'-'+n.getStart(sf).toString(36);
  function addImport(name){used.add(name);}
  function replaceTag(open,close,name,attrs){edits.push({start:open.tagName.getStart(sf),end:open.tagName.end,text:name});if(close)edits.push({start:close.tagName.getStart(sf),end:close.tagName.end,text:name});edits.push({start:open.tagName.end,end:open.tagName.end,text:' '+attrs});addImport(name);}
  function visit(n){
    if(ts.isJsxElement(n)||ts.isJsxSelfClosingElement(n)){
      const open=ts.isJsxElement(n)?n.openingElement:n,close=ts.isJsxElement(n)?n.closingElement:null,tag=open.tagName.getText(sf);
      if(tag==='section'){
        const key=open.attributes.properties.find(p=>ts.isJsxAttribute(p)&&p.name.getText(sf)==='key');let instance='';if(key?.initializer){const v=key.initializer;instance=' instanceKey='+v.getText(sf);}
        replaceTag(open,close,'EditorSection','editorId="'+id(n)+'"'+instance);
      }else if(tag==='div'&&ts.isJsxElement(n)&&n.children.some(c=>ts.isJsxElement(c)&&c.openingElement.tagName.getText(sf)==='section'))replaceTag(open,close,'EditorFlow','containerId="'+id(n)+'"');
      else if(['Link','a'].includes(tag)&&open.attributes.properties.some(p=>ts.isJsxAttribute(p)&&p.name.getText(sf)==='href'))replaceTag(open,close,'EditorLink','editorId="'+id(n)+'"');
      else if(tag==='Image')replaceTag(open,close,'EditorImage','editorId="'+id(n)+'"');
      if(ts.isJsxElement(n)&&tags.has(tag)){
        for(const child of n.children){
          if(ts.isJsxText(child)){
            const raw=child.getText(sf),lines=raw.replace(/\r/g,'').split('\n');let value='';lines.forEach((line,i)=>{let v=line.replace(/\t/g,' ');if(i>0)v=v.replace(/^ +/,'');if(i<lines.length-1)v=v.replace(/ +$/,'');if(v)value+=v+(i<lines.length-1?' ':'');});
            if(value.trim()){edits.push({start:child.getStart(sf),end:child.end,text:'<EditorText editorId="'+id(child)+'" tag="'+tag+'" value={'+JSON.stringify(value)+'} />'});addImport('EditorText');}
          }else if(ts.isJsxExpression(child)&&child.expression&&!ts.isJsxElement(child.expression)&&!ts.isJsxSelfClosingElement(child.expression)){
            const expr=child.expression.getText(sf);if(!expr.includes('=>')&&!expr.includes('map(')&&!expr.includes('<')){edits.push({start:child.getStart(sf),end:child.end,text:'<EditorText editorId="'+id(child)+'" tag="'+tag+'" value={'+expr+'} />'});addImport('EditorText');}
          }
        }
      }
    }
    ts.forEachChild(n,visit);
  }
  visit(sf);if(!edits.length)continue;
  let output=original;for(const e of edits.sort((a,b)=>b.start-a.start||b.end-a.end))output=output.slice(0,e.start)+e.text+output.slice(e.end);
  const importLine='\nimport { '+[...used].sort().join(', ')+' } from "@/components/website-editor/Editable";\n';const directive=output.match(/^\s*["']use client["'];?/);const insert=directive?directive[0].length:0;output=output.slice(0,insert)+importLine+output.slice(insert);fs.writeFileSync(file,output);report.push({file:relative,sourceHash:crypto.createHash('sha256').update(original).digest('hex'),regions:edits.filter(e=>e.text.includes('editorId')).length});
}
fs.writeFileSync('lib/website-editor/migration-manifest.json',JSON.stringify({sourceDeployment:'dpl_7535efcpj8Q2B74nVMWHCdB4MCX6',registry:'ingenium-v1',files:report},null,2));console.log(JSON.stringify({files:report.length,regions:report.reduce((n,r)=>n+r.regions,0)}));
