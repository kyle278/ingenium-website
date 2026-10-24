const fs=require('fs');
const file='components/rebuild/OfferPage.tsx';let s=fs.readFileSync(file,'utf8');
s=s.replace(/editorId="[^"]+" tag="p" value=\{offer.setup\}/,'editorId={"offer."+offer.slug+".setup"} identity={offer.slug} tag="p" value={offer.setup}');
s=s.replace(/editorId="[^"]+" tag="p" value=\{offer.monthly.toLowerCase\(\)\}/,'editorId={"offer."+offer.slug+".monthly"} identity={offer.slug} tag="p" value={offer.monthly.toLowerCase()}');
s=s.replace(/<EditorText editorId="[^"]+" tag="strong" value=\{offer.annual\} \/>/,'<OfferTotal offer={offer}/>');
s='import OfferTotal from "@/components/website-editor/OfferTotal";\n'+s;fs.writeFileSync(file,s);
const home='app/(website)/page.tsx';let h=fs.readFileSync(home,'utf8');const slug='(offer.title === "Websites" ? "websites" : offer.title === "CRM" ? "crm" : "connected")';
for(const field of ['setup','monthly']){const re=new RegExp('editorId="[^"]+" tag="([^"]+)" value=\\{offer.'+field+'\\}');h=h.replace(re,(_m,tag)=>'editorId={"offer."+'+slug+'+".'+field+'"} identity={'+slug+'} tag="'+tag+'" value={offer.'+field+'}');}fs.writeFileSync(home,h);
const pricing='app/(website)/pricing/page.tsx';let p=fs.readFileSync(pricing,'utf8');p=p.replace(/<EditorText editorId="[^"]+" tag="strong" value=\{"€5,888"\} \/>/,'<OfferTotal offer={offers[3]}/>');p='import OfferTotal from "@/components/website-editor/OfferTotal";\n'+p;fs.writeFileSync(pricing,p);
