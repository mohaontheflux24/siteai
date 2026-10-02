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
    if(r.data.url)q.set("url",r.data.url);
    router.push(`/builder?${q}`);
  }
  return <form onSubmit={onSubmit} noValidate className="grid gap-5">
    {([["name","Nom du commerce","Boulangerie Dupont","text"],["city","Ville","Liège","text"],["url","Site actuel ou fiche Google (optionnel)","https://","url"]] as const).map(([n,l,p,t])=>
      <label key={n} className="grid gap-2 text-sm font-medium">{l}
        <input name={n} type={t} placeholder={p} className={field} aria-invalid={!!errors[n]} aria-describedby={errors[n]?`${n}-e`:undefined}/>
        {errors[n]&&<span id={`${n}-e`} role="alert" className="text-sm font-normal text-red-600">{errors[n]}</span>}
      </label>)}
    <button className="mt-2 rounded-lg bg-[var(--brand)] px-6 py-3.5 text-base font-semibold text-[var(--brand-ink)] transition hover:brightness-110 active:scale-[.99]">Créer mon site</button>
  </form>;
}
