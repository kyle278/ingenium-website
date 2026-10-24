import { createHmac,timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { revalidatePath,revalidateTag } from "next/cache";
import { EDITOR_TAG } from "@/lib/website-editor/server";
import { PORTAL_SITE_ID } from "@/lib/portalIntegration/public";
export const runtime="nodejs";
export async function POST(req:Request){
  const secret=process.env.INGENIUM_EDITOR_SIGNING_SECRET,t=req.headers.get("x-ingenium-timestamp")||"",sig=req.headers.get("x-ingenium-signature")||"";
  if(!secret||!/^\d{13}$/.test(t)||Math.abs(Date.now()-Number(t))>300000||!/^[a-f0-9]{64}$/.test(sig))return NextResponse.json({error:"Invalid signature."},{status:401});
  const body=await req.text();if(body.length>16000)return NextResponse.json({error:"Payload too large."},{status:413});
  const expected=createHmac("sha256",secret).update(t+"."+body).digest("hex");
  if(!timingSafeEqual(Buffer.from(expected),Buffer.from(sig)))return NextResponse.json({error:"Invalid signature."},{status:401});
  try{const data=JSON.parse(body);if(data.type!=="editor.release"||data.siteId!==PORTAL_SITE_ID||!Array.isArray(data.paths)||data.paths.some((p:unknown)=>typeof p!=="string"||!/^\/(?!\/)/.test(p)))throw new Error("Invalid release");
    revalidateTag(EDITOR_TAG,{expire:0});for(const p of data.paths)revalidatePath(p,"page");
    return NextResponse.json({acknowledged:true,releaseId:data.releaseId,generation:data.generation},{headers:{"Cache-Control":"no-store"}});
  }catch{return NextResponse.json({error:"Invalid release."},{status:422});}
}
