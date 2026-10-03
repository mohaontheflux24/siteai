import type { Facts } from "@/lib/site/schema";
export type SearchInput={name:string;city:string;url?:string;phone?:string;address?:string;services?:string;about?:string};
export type BusinessProvider={id:string;search(i:SearchInput):Promise<{facts:Partial<Facts>;imageUrls:string[]}>};
