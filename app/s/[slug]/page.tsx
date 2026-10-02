import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { sites } from "@/lib/site/store";
import { SiteRenderer } from "@/components/preview/SiteRenderer";
const find=(slug:string)=>[...sites.values()].find(s=>s.slug===slug&&s.status==="published");
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const r=find((await params).slug);return r?{title:r.site.seo.title,description:r.site.seo.description}:{}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const r=find((await params).slug);if(!r)notFound();return <SiteRenderer site={r.site}/>}
