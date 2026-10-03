import { z } from "zod";
const opt=z.string().optional();
export const templates=["modern","premium","minimal","bold","restaurant","coiffeur","garage","artisan","boutique","cabinet","service"] as const;
const build=(color:z.ZodString)=>z.object({
  template:z.enum(templates),
  business:z.object({name:z.string(),category:z.string(),city:z.string(),address:opt,phone:opt,website:opt,email:opt,openingHours:z.array(z.string()).optional(),socialLinks:z.array(z.string()).optional()}),
  branding:z.object({logo:opt,primaryColor:color,secondaryColor:color,font:z.enum(["serif","sans"]),style:z.string()}),
  hero:z.object({title:z.string(),subtitle:z.string(),image:opt,cta:z.object({label:z.string(),action:z.string()})}),
  about:z.object({title:z.string(),text:z.string(),image:opt}).optional(),
  services:z.array(z.object({name:z.string(),description:z.string(),price:opt})),
  gallery:z.array(z.object({url:z.string(),alt:z.string(),source:z.string(),illustrative:z.boolean().optional()})).optional(),
  contact:z.object({phone:opt,address:opt,mapUrl:opt}),
  seo:z.object({title:z.string(),description:z.string()}),
});
export const siteSchema=build(z.string().regex(/^#[0-9a-fA-F]{6}$/));
// Schéma allégé pour les modèles IA (certains refusent les regex) ; les couleurs sont validées ensuite.
export const looseSiteSchema=build(z.string());
export const looseContentSchema=looseSiteSchema.pick({template:true,branding:true,hero:true,about:true,services:true,seo:true});
export type GeneratedSite=z.infer<typeof siteSchema>;
export const fixColors=<T extends {branding:{primaryColor:string;secondaryColor:string}}>(s:T):T=>{const ok=(c:string,d:string)=>/^#[0-9a-fA-F]{6}$/.test(c)?c:d;return {...s,branding:{...s.branding,primaryColor:ok(s.branding.primaryColor,"#1F6F5C"),secondaryColor:ok(s.branding.secondaryColor,"#12231E")}}};
export const contentSchema=siteSchema.pick({template:true,branding:true,hero:true,about:true,services:true,seo:true});
export type Facts={name:string;city:string;category?:string;description?:string;address?:string;phone?:string;website?:string;email?:string;openingHours?:string[];socialLinks?:string[];services?:string[];logo?:string};
