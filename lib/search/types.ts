import type { Facts } from "@/lib/site/schema";
export type SearchInput={name:string;city:string;url?:string};
export type BusinessProvider={id:string;search(i:SearchInput):Promise<{facts:Partial<Facts>;imageUrls:string[]}>};
