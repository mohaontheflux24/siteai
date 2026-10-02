import { neon } from "@neondatabase/serverless";
import type { GeneratedSite } from "./schema";
export type SiteRecord={id:string;slug:string;site:GeneratedSite;status:"draft"|"published";createdAt:string;edits:number;photos:number;url?:string;plan?:string;domain?:string};
// Stockage Postgres (Neon). DATABASE_URL est fournie par l'intégration Vercel.
let ready:Promise<unknown>|undefined;
const db=()=>{const url=process.env.DATABASE_URL;if(!url)throw new Error("DATABASE_URL manquante");return neon(url)};
async function init(){ready??=db()`CREATE TABLE IF NOT EXISTS sites(id text PRIMARY KEY,slug text UNIQUE NOT NULL,site jsonb NOT NULL,status text NOT NULL DEFAULT 'draft',created_at timestamptz NOT NULL DEFAULT now(),edits int NOT NULL DEFAULT 0,photos int NOT NULL DEFAULT 0,url text,plan text,domain text)`;await ready}
type Row={id:string;slug:string;site:GeneratedSite;status:"draft"|"published";created_at:string;edits:number;photos:number;url:string|null;plan:string|null;domain:string|null};
const map=(r:Row):SiteRecord=>({id:r.id,slug:r.slug,site:r.site,status:r.status,createdAt:new Date(r.created_at).toISOString(),edits:r.edits,photos:r.photos,url:r.url??undefined,plan:r.plan??undefined,domain:r.domain??undefined});
export async function createSite(r:Pick<SiteRecord,"id"|"slug"|"site"|"photos">){await init();await db()`INSERT INTO sites(id,slug,site,photos) VALUES(${r.id},${r.slug},${JSON.stringify(r.site)}::jsonb,${r.photos})`}
export async function getSite(id:string){await init();const [r]=await db()`SELECT * FROM sites WHERE id=${id}` as Row[];return r?map(r):undefined}
export async function getPublishedBySlug(slug:string){await init();const [r]=await db()`SELECT * FROM sites WHERE slug=${slug} AND status='published'` as Row[];return r?map(r):undefined}
export async function updateSite(id:string,site:GeneratedSite){await init();await db()`UPDATE sites SET site=${JSON.stringify(site)}::jsonb,edits=edits+1 WHERE id=${id}`}
export async function publishSite(id:string){await init();const [r]=await db()`UPDATE sites SET status='published',url='/s/'||slug WHERE id=${id} RETURNING url` as {url:string}[];return r?.url}
export async function listSites(){await init();return (await db()`SELECT * FROM sites ORDER BY created_at DESC LIMIT 200` as Row[]).map(map)}
export const slugify=(s:string)=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
