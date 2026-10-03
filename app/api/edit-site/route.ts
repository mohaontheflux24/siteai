import { NextResponse } from "next/server";
import { editSite } from "@/lib/ai/generate";
import { getSite, updateSite } from "@/lib/site/store";
export const maxDuration=60;
export async function POST(req:Request){
  const {id,instruction}=await req.json(), rec=await getSite(id);
  if(!rec) return NextResponse.json({error:"Site introuvable."},{status:404});
  try{const {site,note}=await editSite(rec.site,String(instruction).slice(0,500));await updateSite(id,site);return NextResponse.json({site,note,edits:rec.edits+1})}
  catch(e){console.error("[edit-site]",e);return NextResponse.json({error:"La modification a échoué. Réessayez."},{status:500})}
}
