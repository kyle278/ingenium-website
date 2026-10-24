"use client";
import { useEditorValue,useScopedId } from "./EditorProvider";
import { elementId } from "@/lib/website-editor/types";
import type { Offer } from "@/components/rebuild/offers";
export default function OfferTotal({offer}:{offer:Offer}){
  const setup=useEditorValue(useScopedId(elementId("offer."+offer.slug+".setup",offer.slug))).text??offer.setup;
  const monthly=useEditorValue(useScopedId(elementId("offer."+offer.slug+".monthly",offer.slug))).text??offer.monthly;
  const parse=(value:string)=>Number(value.replace(/[^0-9.]/g,""));
  if(setup===offer.setup&&monthly===offer.monthly)return <>{offer.annual}</>;
  const amount=parse(setup)+12*parse(monthly);
  return <>{Number.isFinite(amount)?new Intl.NumberFormat("en-IE",{style:"currency",currency:"EUR",minimumFractionDigits:0,maximumFractionDigits:2}).format(amount):offer.annual}</>;
}
