import type { GeneratedSite } from "./schema";
export type SiteRecord={id:string;slug:string;site:GeneratedSite;status:"draft"|"published";createdAt:string;edits:number;photos:number;url?:string;plan?:string;domain?:string};
// MVP : mémoire serveur (se vide au redémarrage). À remplacer par une vraie base.
const g=globalThis as unknown as {__sites?:Map<string,SiteRecord>};
export const sites=(g.__sites??=new Map<string,SiteRecord>());
export const slugify=(s:string)=>s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
