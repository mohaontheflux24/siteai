import { NextResponse } from "next/server";
import { businessRequestSchema } from "@/lib/validation/request";
import { searchBusiness } from "@/lib/search";
export async function POST(req:Request){
  const p=businessRequestSchema.safeParse(await req.json().catch(()=>null));
  if(!p.success) return NextResponse.json({error:"Informations manquantes."},{status:400});
  const r=await searchBusiness(p.data);
  if(r.failed) return NextResponse.json({error:"Nous n'avons pas pu lire ce site. Vérifiez l'adresse ou continuez sans."},{status:502});
  return NextResponse.json({facts:r.facts,imageUrls:r.imageUrls,found:r.found});
}
