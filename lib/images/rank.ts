import type { ScoredImage } from "./analyze";
export function rankImages(imgs:ScoredImage[]){
  const seen=new Set<string>(),uniq=imgs.filter(i=>{const k=`${i.width}x${i.height}x${i.bytes}`;if(seen.has(k))return false;seen.add(k);return true});
  const good=uniq.filter(i=>i.usable).sort((a,b)=>b.score-a.score);
  return {hero:good[0],gallery:good.slice(1,7),rejected:imgs.length-good.length};
}
