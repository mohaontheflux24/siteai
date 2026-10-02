import { NextResponse } from "next/server";
import { analyzeImage, type ScoredImage } from "@/lib/images/analyze";
import { rankImages } from "@/lib/images/rank";
export const maxDuration=60;
export async function POST(req:Request){
  const {urls}=await req.json().catch(()=>({urls:[]})) as {urls:string[]};
  const scored=(await Promise.all(urls.slice(0,24).map(analyzeImage))).filter((x):x is ScoredImage=>!!x);
  return NextResponse.json(rankImages(scored));
}
