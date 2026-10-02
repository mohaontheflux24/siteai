import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPublishedBySlug } from "@/lib/site/store";
import { SiteRenderer } from "@/components/preview/SiteRenderer";
const find=getPublishedBySlug;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const r=await find((await params).slug);return r?{title:r.site.seo.title,description:r.site.seo.description}:{}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const r=await find((await params).slug);if(!r)notFound();return <SiteRenderer site={r.site}/>}
