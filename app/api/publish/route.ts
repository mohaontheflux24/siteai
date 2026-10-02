import { NextResponse } from "next/server";
import { sites } from "@/lib/site/store";
// MVP : le site est servi sur /s/[slug]. Plus tard : sous-domaine {slug}.siteai.app via middleware + API Domains de Vercel.
export async function POST(req:Request){
  const {id}=await req.json(),rec=sites.get(id);
  if(!rec) return NextResponse.json({error:"Site introuvable."},{status:404});
  rec.status="published";rec.url=`/s/${rec.slug}`;
  return NextResponse.json({url:rec.url});
}
