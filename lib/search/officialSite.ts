import type { BusinessProvider } from "./types";
const meta=(h:string,p:string)=>h.match(new RegExp(`<meta[^>]+(?:property|name)=["']${p}["'][^>]+content=["']([^"']+)`,"i"))?.[1];
export const officialSite:BusinessProvider={id:"official-site",async search({url}){
  if(!url) return {facts:{},imageUrls:[]};
  const res=await fetch(url,{signal:AbortSignal.timeout(8000),headers:{"user-agent":"SiteAIBot/1.0"}});
  if(!res.ok) throw new Error("site_unreachable");
  const html=(await res.text()).slice(0,500_000), base=new URL(url);
  const abs=(u:string)=>{try{return new URL(u,base).href}catch{return undefined}};
  const imgs=[meta(html,"og:image"),...[...html.matchAll(/<img[^>]+src=["']([^"']+)/gi)].map(m=>m[1])].filter(Boolean).map(u=>abs(u!)).filter((u):u is string=>!!u&&!/\.(svg|gif)(\?|$)/i.test(u));
  const tel=html.match(/href=["']tel:([+\d\s().-]{6,})/i)?.[1], mail=html.match(/href=["']mailto:([^"'?]+)/i)?.[1];
  const social=[...new Set([...html.matchAll(/href=["'](https?:\/\/(?:www\.)?(?:facebook|instagram|linkedin)\.com\/[^"']+)/gi)].map(m=>m[1]))];
  return {facts:{website:url,description:meta(html,"og:description")??meta(html,"description"),phone:tel?.trim(),email:mail,socialLinks:social},imageUrls:[...new Set(imgs)].slice(0,24)};
}};
