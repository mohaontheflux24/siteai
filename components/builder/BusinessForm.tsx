"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { businessRequestSchema } from "@/lib/validation/request";
const field="w-full rounded-lg border border-[var(--line)] bg-[var(--card)] px-4 py-3 text-base outline-none focus:border-[var(--brand)]";
export function BusinessForm(){
  const router=useRouter();
  const [errors,setErrors]=useState<Record<string,string>>({});
  function onSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const d=Object.fromEntries(new FormData(e.currentTarget)) as Record<string,string>;
    const r=businessRequestSchema.safeParse(d);
    if(!r.success){const m:Record<string,string>={};r.error.issues.forEach(i=>{m[String(i.path[0])]=i.message});setErrors(m);return}
    const q=new URLSearchParams({name:r.data.name,city:r.data.city});
    for(const k of ["url","phone","address","services","about"] as const)if(r.data[k])q.set(k,r.data[k]!);
    router.push(`/builder?${q}`);
  }
  return <form onSubmit={onSubmit} noValidate className="grid gap-5">
    {([["name","Nom du commerce","Boulangerie Dupont","text"],["city","Ville","Liège","text"],["url","Site actuel ou fiche Google (optionnel)","https://","url"]] as const).map(([n,l,p,t])=>
      <label key={n} className="grid gap-2 text-sm font-medium">{l}
        <input name={n} type={t} placeholder={p} className={field} aria-invalid={!!errors[n]} aria-describedby={errors[n]?`${n}-e`:undefined}/>
        {errors[n]&&<span id={`${n}-e`} role="alert" className="text-sm font-normal text-red-600">{errors[n]}</span>}
      </label>)}
    <details className="rounded-lg border border-[var(--line)] p-4 [&[open]]:pb-5"><summary className="cursor-pointer text-sm font-medium">Ajouter des détails (recommandé, pour un site plus complet)</summary>
      <div className="mt-4 grid gap-4">{([["phone","Téléphone","+32 …"],["address","Adresse","Rue, numéro"],["services","Vos services (séparés par des virgules)","Taxi aéroport, Trajet longue distance, …"],["about","Quelques mots sur votre activité","Ce qui vous distingue…"]] as const).map(([n,l,p])=>
        <label key={n} className="grid gap-2 text-sm font-medium">{l}{n==="about"||n==="services"?<textarea name={n} rows={2} placeholder={p} className={field}/>:<input name={n} placeholder={p} className={field}/>}</label>)}</div></details>
    <button className="mt-2 rounded-lg bg-[var(--brand)] px-6 py-3.5 text-base font-semibold text-[var(--brand-ink)] transition hover:brightness-110 active:scale-[.99]">Créer mon site</button>
  </form>;
}
