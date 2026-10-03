import { NextResponse } from "next/server";
import { generateSite } from "@/lib/ai/generate";
import { createSite, slugify } from "@/lib/site/store";
export const maxDuration=120;
export async function POST(req:Request){
  const {facts,hero,gallery}=await req.json();
  try{
    const site=await generateSite(facts,{hero,gallery:gallery??[]});
    const id=crypto.randomUUID().slice(0,8);
    await createSite({id,slug:`${slugify(facts.name)}-${id.slice(0,4)}`,site,photos:(gallery?.length??0)+(hero?1:0)});
    return NextResponse.json({id});
  }catch(e){console.error("[generate]",e);return NextResponse.json({error:"La création a échoué. Réessayez."},{status:500})}
}
