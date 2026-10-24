import { NextResponse } from "next/server";
import { portalHeaders } from "@/lib/website-editor/connection";
export const runtime="nodejs";

/** Keep protected staging media same-origin; the Portal still verifies its expiring asset signature. */
export async function GET(req:Request){
  const query=new URL(req.url).searchParams;
  const id=query.get("id")||"",expires=query.get("expires")||"",signature=query.get("signature")||"";
  const origin=process.env.INGENIUM_EDITOR_STAGING_PORTAL_ORIGIN,key=process.env.INGENIUM_EDITOR_SITE_KEY;
  if(!origin||!key||!/^editor_[a-f0-9]{32}$/.test(key)||!/^[-a-f0-9]{36}$/.test(id)||!/^\d{13}$/.test(expires)||!/^[a-f0-9]{64}$/.test(signature))return new NextResponse(null,{status:404});
  try{
    const response=await fetch(origin+"/api/websites/editor/public/v1/"+key+"/media/"+id+"?expires="+expires+"&signature="+signature,{headers:portalHeaders(origin),cache:"no-store",redirect:"error",signal:AbortSignal.timeout(10000)});
    if(!response.ok)return new NextResponse(null,{status:response.status,headers:{"Cache-Control":"private, no-store"}});
    if(response.headers.get("content-type")!=="image/webp")return new NextResponse(null,{status:502});
    return new NextResponse(response.body,{headers:{"Content-Type":"image/webp","Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff","X-Robots-Tag":"noindex","Referrer-Policy":"no-referrer"}});
  }catch{return new NextResponse(null,{status:502,headers:{"Cache-Control":"private, no-store"}});}
}
