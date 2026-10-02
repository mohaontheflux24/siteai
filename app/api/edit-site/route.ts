import { NextResponse } from "next/server";
import { editSite } from "@/lib/ai/generate";
import { sites } from "@/lib/site/store";
export const maxDuration=60;
export async function POST(req:Request){
  const {id,instruction}=await req.json(), rec=sites.get(id);
  if(!rec) return NextResponse.json({error:"Site introuvable."},{status:404});
  try{rec.site=await editSite(rec.site,String(instruction).slice(0,500));rec.edits++;return NextResponse.json({site:rec.site,edits:rec.edits})}
  catch{return NextResponse.json({error:"La modification a échoué. Réessayez."},{status:500})}
}
