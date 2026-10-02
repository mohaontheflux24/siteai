import { NextResponse } from "next/server";
import { getSite, publishSite } from "@/lib/site/store";
// MVP : le site est servi sur /s/[slug]. Plus tard : sous-domaine {slug}.siteai.app via middleware + API Domains de Vercel.
export async function POST(req:Request){
  const {id}=await req.json(),rec=await getSite(id);
  if(!rec) return NextResponse.json({error:"Site introuvable."},{status:404});
  return NextResponse.json({url:await publishSite(id)});
}
