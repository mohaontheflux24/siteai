"use client";
import { useState } from "react";
import type { GeneratedSite } from "@/lib/site/schema";
import { SiteRenderer } from "./SiteRenderer";
const IDEAS=["Mets le site en noir et doré","Fais quelque chose de plus luxueux","Change le texte du bouton en Prendre rendez-vous","Supprime la galerie"];
export function PreviewShell({id,initial,publishedUrl}:{id:string;initial:GeneratedSite;publishedUrl?:string}){
  const [site,setSite]=useState(initial),[mode,setMode]=useState<"desktop"|"mobile">("desktop");
  const [text,setText]=useState(""),[busy,setBusy]=useState(false),[err,setErr]=useState(""),[note,setNote]=useState(""),[url,setUrl]=useState(publishedUrl);
  async function post(path:string,body:object){
    const r=await fetch(path,{method:"POST",body:JSON.stringify(body),signal:AbortSignal.timeout(90000)}).catch(()=>{throw new Error("La connexion a échoué ou pris trop de temps. Réessayez.")});
    const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error??"Une erreur est survenue. Réessayez.");return j}
  async function apply(instruction:string){
    if(!instruction.trim()||busy)return;setBusy(true);setErr("");setNote("");
    try{const j=await post("/api/edit-site",{id,instruction});setSite(j.site);setNote(j.note||"Modification appliquée.");setText("")}
    catch(x){setErr((x as Error).message)}setBusy(false)}
  async function publish(){setBusy(true);setErr("");try{setUrl((await post("/api/publish",{id})).url)}catch(x){setErr((x as Error).message)}setBusy(false)}
  const tab=(m:"desktop"|"mobile")=>`rounded-md px-3 py-1.5 text-sm ${mode===m?"bg-[var(--brand)] text-[var(--brand-ink)]":""}`;
  return <div className="grid min-h-screen lg:grid-cols-[1fr_340px]">
    <section className="p-4 sm:p-8"><div className="mb-4 flex gap-2"><button className={tab("desktop")} onClick={()=>setMode("desktop")}>Desktop</button><button className={tab("mobile")} onClick={()=>setMode("mobile")}>Mobile</button></div>
      <div className="mx-auto overflow-hidden rounded-xl border border-[var(--line)] transition-[max-width]" style={{maxWidth:mode==="mobile"?390:1200}}><SiteRenderer site={site}/></div></section>
    <aside className="border-t border-[var(--line)] p-6 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-l lg:border-t-0">
      <form onSubmit={e=>{e.preventDefault();apply(text)}} className="grid gap-3">
        <label className="font-medium" htmlFor="q">Modifier avec l'IA</label>
        <textarea id="q" rows={3} value={text} onChange={e=>setText(e.target.value)} disabled={busy} placeholder="Que voulez-vous modifier ?" className="rounded-lg border border-[var(--line)] bg-[var(--card)] p-3"/>
        <button disabled={busy||!text.trim()} className="rounded-lg bg-[var(--brand)] py-3 font-semibold text-[var(--brand-ink)] disabled:opacity-50">{busy?"Modification en cours…":"Appliquer"}</button>
        {busy&&<p className="text-sm text-[var(--muted)]">Cela peut prendre jusqu'à 30 secondes.</p>}
        {err&&<p role="alert" className="text-sm text-red-600">{err}</p>}
        {note&&<p role="status" className="rounded-lg border border-[var(--line)] bg-[var(--card)] p-3 text-sm">✓ {note}</p>}</form>
      <div className="mt-5"><p className="mb-2 text-xs uppercase tracking-widest text-[var(--muted)]">Idées</p><div className="flex flex-wrap gap-2">{IDEAS.map(i=><button key={i} type="button" disabled={busy} onClick={()=>apply(i)} className="rounded-full border border-[var(--line)] px-3 py-1.5 text-left text-xs disabled:opacity-50">{i}</button>)}</div></div>
      <div className="mt-8 border-t border-[var(--line)] pt-6"><button onClick={publish} disabled={busy} className="w-full rounded-lg border border-[var(--brand)] py-3 font-semibold disabled:opacity-50">Publier</button>
        {url&&<p className="mt-3 text-sm">Publié : <a className="underline" href={url}>{url}</a></p>}</div></aside></div>;
}
