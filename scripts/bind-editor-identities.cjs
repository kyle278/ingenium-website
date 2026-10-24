const fs=require('fs'),path=require('path'),ts=require('typescript');
const manifest=JSON.parse(fs.readFileSync('lib/website-editor/migration-manifest.json','utf8'));let count=0;
for(const entry of manifest.files){const source=fs.readFileSync(entry.file,'utf8'),file=ts.createSourceFile(entry.file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX),edits=[];
function visit(n){if(ts.isJsxElement(n)||ts.isJsxSelfClosingElement(n)){const open=ts.isJsxElement(n)?n.openingElement:n,tag=open.tagName.getText(file),property=tag==='EditorSection'?'instanceKey':'identity';if(['EditorText','EditorLink','EditorImage','EditorSection'].includes(tag)&&!open.attributes.properties.some(p=>ts.isJsxAttribute(p)&&p.name.getText(file)===property)){
let parent=n.parent;while(parent){if(ts.isJsxElement(parent)){const key=parent.openingElement.attributes.properties.find(p=>ts.isJsxAttribute(p)&&p.name.getText(file)==='key');if(key?.initializer){edits.push({start:open.tagName.end,text:' '+property+'='+key.initializer.getText(file)});break;}}parent=parent.parent;}}
}ts.forEachChild(n,visit);}visit(file);let output=source;for(const e of edits.sort((a,b)=>b.start-a.start))output=output.slice(0,e.start)+e.text+output.slice(e.start);if(edits.length){fs.writeFileSync(entry.file,output);count+=edits.length;}}
console.log(JSON.stringify({boundRepeatedRegionIdentities:count}));
