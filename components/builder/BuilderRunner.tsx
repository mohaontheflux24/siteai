"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ProgressSteps } from "./ProgressSteps";
import { BUILD_STEPS, type BuildStep, type BuildStepId, type StepStatus } from "@/types/site";
import type { BusinessRequest } from "@/lib/validation/request";
const init=():BuildStep[]=>BUILD_STEPS.map(s=>({...s,status:"pending"}));
async function call<T>(path:string,body:object):Promise<T>{const r=await fetch(path,{method:"POST",body:JSON.stringify(body),signal:AbortSignal.timeout(150000)}).catch(()=>{throw new Error("La connexion a échoué ou pris trop de temps. Réessayez.")});const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error??"Une erreur est survenue. Réessayez.");return j}
export function BuilderRunner({req}:{req:BusinessRequest}){
  const router=useRouter(),started=useRef(false),[steps,setSteps]=useState(init),[err,setErr]=useState(""),[run,setRun]=useState(0);
  const set=(ids:BuildStepId[],status:StepStatus)=>setSteps(s=>s.map(x=>ids.includes(x.id)?{...x,status}:x));
  useEffect(()=>{if(started.current&&run===0)return;started.current=true;setSteps(init());setErr("");let live=true;
    (async()=>{let cur:BuildStepId[]=["search"];
      try{
        set(["search","info"],"active");cur=["search","info"];
        const s=await call<{facts:unknown;imageUrls:string[]}>("/api/search-business",req);set(["search","info"],"done");
        set(["photos"],"active");cur=["photos"];
        const r=s.imageUrls.length?await call<{hero?:{url:string};gallery:{url:string}[]}>("/api/analyze-images",{urls:s.imageUrls}):{hero:undefined,gallery:[]};
        set(["photos","select"],"done");
        set(["content","design","generate"],"active");cur=["content","design","generate"];
        const g=await call<{id:string}>("/api/generate",{facts:s.facts,hero:r.hero?.url,gallery:r.gallery});
        set(["content","design","generate"],"done");if(live)router.push(`/preview/${g.id}`);
      }catch(e){set(cur,"error");setErr((e as Error).message)}})();
    return()=>{live=false}},[run]);// eslint-disable-line react-hooks/exhaustive-deps
  return <>
    <ProgressSteps steps={steps}/>
    {!err&&steps.some(s=>s.status==="active")&&<p className="mt-4 text-sm text-[var(--muted)]">Cela peut prendre jusqu'à une minute. Ne fermez pas cette page.</p>}
    {err&&<div role="alert" className="mt-6 rounded-lg border border-red-600/40 p-4 text-sm"><p>{err}</p>
      <button onClick={()=>setRun(n=>n+1)} className="mt-3 rounded-lg bg-[var(--brand)] px-4 py-2 font-medium text-[var(--brand-ink)]">Réessayer</button></div>}
  </>;
}
