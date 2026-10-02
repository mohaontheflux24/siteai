"use client";
import { useState } from "react";
import type { GeneratedSite } from "@/lib/site/schema";
import { SiteRenderer } from "./SiteRenderer";
export function PreviewShell({id,initial,publishedUrl}:{id:string;initial:GeneratedSite;publishedUrl?:string}){
  const [site,setSite]=useState(initial),[mode,setMode]=useState<"desktop"|"mobile">("desktop");
  const [text,setText]=useState(""),[busy,setBusy]=useState(false),[err,setErr]=useState(""),[url,setUrl]=useState(publishedUrl);
  async function post(path:string,body:object){const r=await fetch(path,{method:"POST",body:JSON.stringify(body)});const j=await r.json();if(!r.ok)throw new Error(j.error);return j}
  async function edit(e:React.FormEvent){e.preventDefault();if(!text.trim())return;setBusy(true);setErr("");
    try{setSite((await post("/api/edit-site",{id,instruction:text})).site);setText("")}catch(x){setErr((x as Error).message)}setBusy(false)}
  async function publish(){setBusy(true);try{setUrl((await post("/api/publish",{id})).url)}catch(x){setErr((x as Error).message)}setBusy(false)}
  const tab=(m:"desktop"|"mobile")=>`rounded-md px-3 py-1.5 text-sm ${mode===m?"bg-[var(--brand)] text-[var(--brand-ink)]":""}`;
  return <div className="grid min-h-screen lg:grid-cols-[1fr_340px]">
    <section className="p-4 sm:p-8"><div className="mb-4 flex gap-2"><button className={tab("desktop")} onClick={()=>setMode("desktop")}>Desktop</button><button className={tab("mobile")} onClick={()=>setMode("mobile")}>Mobile</button></div>
      <div className="mx-auto overflow-hidden rounded-xl border border-[var(--line)] transition-[max-width]" style={{maxWidth:mode==="mobile"?390:1200}}><SiteRenderer site={site}/></div></section>
    <aside className="border-t border-[var(--line)] p-6 lg:border-l lg:border-t-0"><form onSubmit={edit} className="grid gap-3">
      <label className="text-sm font-medium" htmlFor="q">Modifier avec l'IA</label>
      <textarea id="q" rows={4} value={text} onChange={e=>setText(e.target.value)} placeholder="Que voulez-vous modifier ?" className="rounded-lg border border-[var(--line)] bg-[var(--card)] p-3"/>
      <button disabled={busy} className="rounded-lg bg-[var(--brand)] py-3 font-semibold text-[var(--brand-ink)] disabled:opacity-50">{busy?"En cours…":"Appliquer"}</button>
      {err&&<p role="alert" className="text-sm text-red-600">{err}</p>}</form>
      <div className="mt-8 border-t border-[var(--line)] pt-6"><button onClick={publish} disabled={busy} className="w-full rounded-lg border border-[var(--brand)] py-3 font-semibold">Publier</button>
        {url&&<p className="mt-3 text-sm">Publié : <a className="underline" href={url}>{url}</a></p>}</div></aside></div>;
}
