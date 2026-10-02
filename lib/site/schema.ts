import { z } from "zod";
const opt=z.string().optional();
export const templates=["modern","premium","minimal","bold","restaurant","coiffeur","garage","artisan","boutique","cabinet","service"] as const;
export const siteSchema=z.object({
  template:z.enum(templates),
  business:z.object({name:z.string(),category:z.string(),city:z.string(),address:opt,phone:opt,website:opt,email:opt,openingHours:z.array(z.string()).optional(),socialLinks:z.array(z.string()).optional()}),
  branding:z.object({logo:opt,primaryColor:z.string().regex(/^#[0-9a-fA-F]{6}$/),secondaryColor:z.string().regex(/^#[0-9a-fA-F]{6}$/),font:z.enum(["serif","sans"]),style:z.string()}),
  hero:z.object({title:z.string(),subtitle:z.string(),image:opt,cta:z.object({label:z.string(),action:z.string()})}),
  about:z.object({title:z.string(),text:z.string(),image:opt}).optional(),
  services:z.array(z.object({name:z.string(),description:z.string(),price:opt})),
  gallery:z.array(z.object({url:z.string(),alt:z.string(),source:z.string(),illustrative:z.boolean().optional()})).optional(),
  contact:z.object({phone:opt,address:opt,mapUrl:opt}),
  seo:z.object({title:z.string(),description:z.string()}),
});
export type GeneratedSite=z.infer<typeof siteSchema>;
export const contentSchema=siteSchema.pick({template:true,branding:true,hero:true,about:true,services:true,seo:true});
export type Facts={name:string;city:string;category?:string;description?:string;address?:string;phone?:string;website?:string;email?:string;openingHours?:string[];socialLinks?:string[];services?:string[];logo?:string};
