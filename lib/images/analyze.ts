import { imageSize } from "image-size";
export type ScoredImage={url:string;width:number;height:number;bytes:number;score:number;usable:boolean};
export async function analyzeImage(url:string):Promise<ScoredImage|null>{
  try{const r=await fetch(url,{signal:AbortSignal.timeout(8000)});if(!r.ok)return null;
    const buf=new Uint8Array(await r.arrayBuffer());if(buf.length>15e6)return null;
    const {width=0,height=0}=imageSize(buf);const mp=width*height/1e6,ratio=width/Math.max(height,1);
    const resolution=Math.min(mp/2,1)*40,compo=ratio>=1.2&&ratio<=2?20:ratio>=.8?10:0,detail=Math.min(buf.length/(Math.max(mp,.1)*1e6)/0.25,1)*25;
    const score=Math.round(resolution+compo+detail-(width<600?40:0));
    return {url,width,height,bytes:buf.length,score,usable:width>=800&&score>=30};
  }catch{return null}
}
