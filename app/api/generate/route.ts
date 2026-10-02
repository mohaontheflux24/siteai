import { NextResponse } from "next/server";
import { generateSite } from "@/lib/ai/generate";
import { sites, slugify } from "@/lib/site/store";
export const maxDuration=120;
export async function POST(req:Request){
  const {facts,hero,gallery}=await req.json();
  try{
    const site=await generateSite(facts,{hero,gallery:gallery??[]});
    const id=crypto.randomUUID().slice(0,8);
    sites.set(id,{id,slug:`${slugify(facts.name)}-${id.slice(0,4)}`,site,status:"draft",createdAt:new Date().toISOString(),edits:0,photos:(gallery?.length??0)+(hero?1:0)});
    return NextResponse.json({id});
  }catch{return NextResponse.json({error:"La création a échoué. Réessayez."},{status:500})}
}
