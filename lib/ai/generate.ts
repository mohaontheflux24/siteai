import { generateText, Output } from "ai";
import { getModel } from "./model";
import { looseContentSchema, looseSiteSchema, siteSchema, fixColors, type Facts, type GeneratedSite } from "@/lib/site/schema";
export async function generateSite(facts:Facts,photos:{hero?:string;gallery:{url:string}[]}):Promise<GeneratedSite>{
  const {output:c}=await generateText({model:getModel(),output:Output.object({schema:looseContentSchema}),
    system:`Tu conçois des sites de commerces locaux. Français excellent, ton naturel et commercial mais factuel. N'INVENTE jamais prix, certifications, années d'expérience, récompenses, marques, services non confirmés, adresse ou téléphone. Si les faits sont minces, reste général. Services : uniquement ceux des faits, sinon []. CTA : action = "call" | "directions" | "quote" | "booking". Choisis le template adapté au secteur et deux couleurs harmonieuses (hex).`,
    prompt:`Faits vérifiés :\n${JSON.stringify(facts)}`});
  return siteSchema.parse({...fixColors(c),
    business:{name:facts.name,category:facts.category??"Commerce local",city:facts.city,address:facts.address,phone:facts.phone,website:facts.website,email:facts.email,openingHours:facts.openingHours,socialLinks:facts.socialLinks},
    hero:{...c.hero,image:photos.hero},
    gallery:photos.gallery.length?photos.gallery.map(g=>({url:g.url,alt:`${facts.name} – photo`,source:"site-officiel"})):undefined,
    contact:{phone:facts.phone,address:facts.address,mapUrl:facts.address?`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${facts.address} ${facts.city}`)}`:undefined}});
}
export async function editSite(site:GeneratedSite,instruction:string):Promise<GeneratedSite>{
  const {output}=await generateText({model:getModel(),output:Output.object({schema:looseSiteSchema}),
    system:"Tu modifies le JSON d'un site. Applique UNIQUEMENT la demande ; ne touche pas au reste. N'invente aucun fait (prix, adresse, téléphone…).",
    prompt:`Site :\n${JSON.stringify(site)}\n\nDemande : ${instruction}`});
  return siteSchema.parse(fixColors(output));
}
