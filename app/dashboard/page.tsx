import { listSites } from "@/lib/site/store";
export const dynamic="force-dynamic";
// TODO avant mise en production : protéger cette page (authentification admin).
export default async function Dashboard(){
  const rows=await listSites();
  return <main className="mx-auto max-w-5xl px-6 py-16"><h1 className="text-4xl">Tableau de bord</h1>
    <p className="mt-2 text-[var(--muted)]">{rows.length} site{rows.length>1?"s":""} généré{rows.length>1?"s":""}</p>
    {rows.length===0?<p className="mt-10 text-[var(--muted)]">Aucun site pour l'instant. Créez-en un depuis l'accueil.</p>:
    <div className="mt-8 overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-[var(--muted)]"><tr>{["Commerce","Créé le","Statut","URL","Photos","Modifs IA","Abonnement","Domaine"].map(h=><th key={h} className="py-3 pr-4 font-medium">{h}</th>)}</tr></thead>
      <tbody>{rows.map(r=><tr key={r.id} className="border-t border-[var(--line)]"><td className="py-3 pr-4"><a className="underline" href={`/preview/${r.id}`}>{r.site.business.name}</a></td><td className="pr-4">{new Date(r.createdAt).toLocaleDateString("fr-BE")}</td><td className="pr-4">{r.status==="published"?"Publié":"Brouillon"}</td><td className="pr-4">{r.url??"—"}</td><td className="pr-4">{r.photos}</td><td className="pr-4">{r.edits}</td><td className="pr-4">{r.plan??"—"}</td><td>{r.domain??"—"}</td></tr>)}</tbody></table></div>}</main>;
}
