import Link from "next/link";
import { BuilderRunner } from "@/components/builder/BuilderRunner";
import { businessRequestSchema } from "@/lib/validation/request";
export default async function Builder({searchParams}:{searchParams:Promise<Record<string,string|undefined>>}){
  const p=await searchParams;
  const r=businessRequestSchema.safeParse({name:p.name??"",city:p.city??"",url:p.url,phone:p.phone,address:p.address,services:p.services,about:p.about});
  if(!r.success) return <main className="mx-auto max-w-xl px-6 py-24"><h1 className="text-3xl">Il manque des informations</h1><p className="mt-3 text-[var(--muted)]">Indiquez le nom du commerce et la ville pour continuer.</p><Link href="/" className="mt-6 inline-block underline">Retour</Link></main>;
  return <main className="mx-auto max-w-xl px-6 py-20">
    <h1 className="text-4xl">{r.data.name}</h1>
    <p className="mt-2 text-[var(--muted)]">{r.data.city}{r.data.url?` · ${r.data.url}`:""}</p>
    <div className="mt-10"><BuilderRunner req={r.data}/></div>
  </main>;
}
