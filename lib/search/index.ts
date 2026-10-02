import type { Facts } from "@/lib/site/schema";
import type { BusinessProvider, SearchInput } from "./types";
import { officialSite } from "./officialSite";
// Ajouter ici un provider API (ex. Google Places via SEARCH_API_KEY).
const providers:BusinessProvider[]=[officialSite];
export async function searchBusiness(i:SearchInput){
  const facts:Record<string,unknown>={},imageUrls:string[]=[];let failures=0;
  for(const p of providers){try{const r=await p.search(i);Object.entries(r.facts).forEach(([k,v])=>{if(v&&!facts[k])facts[k]=v});imageUrls.push(...r.imageUrls)}catch{failures++}}
  return {facts:{name:i.name,city:i.city,...facts} as Facts,imageUrls,found:Object.keys(facts).length>0,failed:failures===providers.length&&!!i.url};
}
