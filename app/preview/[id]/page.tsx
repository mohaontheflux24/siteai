import Link from "next/link";
import { getSite } from "@/lib/site/store";
import { PreviewShell } from "@/components/preview/PreviewShell";
export default async function Preview({params}:{params:Promise<{id:string}>}){
  const {id}=await params,rec=await getSite(id);
  if(!rec) return <main className="mx-auto max-w-xl px-6 py-24"><h1 className="text-3xl">Site introuvable</h1><p className="mt-3 text-[var(--muted)]">Ce site n'existe plus ou n'a pas encore été créé.</p><Link href="/" className="mt-6 inline-block underline">Créer un site</Link></main>;
  return <PreviewShell id={id} initial={rec.site} publishedUrl={rec.url}/>;
}
