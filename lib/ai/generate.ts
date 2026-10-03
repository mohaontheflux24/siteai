import { generateText, Output } from "ai";
import { getModel } from "./model";
import { llmSchema, llmEditSchema, siteSchema, fixColors, type Facts, type GeneratedSite, type LlmContent } from "@/lib/site/schema";

const apply=(c:Omit<LlmContent,"showGallery"|"note">,base:Omit<GeneratedSite,"template"|"branding"|"hero"|"about"|"services"|"seo"|"gallery">&{hero:{image?:string}}&{gallery?:GeneratedSite["gallery"]},prev?:GeneratedSite)=>fixColors({
  template:c.template,
  business:base.business,
  branding:{logo:prev?.branding.logo,primaryColor:c.primaryColor,secondaryColor:c.secondaryColor,font:c.font,style:c.style,mode:c.mode},
  hero:{title:c.heroTitle,subtitle:c.heroSubtitle,image:base.hero.image,cta:{label:c.ctaLabel,action:c.ctaAction}},
  highlights:c.highlights.filter(h=>h.title.trim()&&h.text.trim()).slice(0,3),
  about:c.aboutText.trim()?{title:c.aboutTitle,text:c.aboutText,image:prev?.about?.image}:undefined,
  // Les prix existants sont conservés ; le modèle n'en crée jamais.
  services:c.services.map(s=>({name:s.name,description:s.description,price:prev?.services.find(p=>p.name===s.name)?.price})),
  gallery:base.gallery,contact:base.contact,
  seo:{title:c.seoTitle,description:c.seoDescription},
});

export async function generateSite(facts:Facts,photos:{hero?:string;gallery:{url:string}[]}):Promise<GeneratedSite>{
  const {output:c}=await generateText({model:getModel(),output:Output.object({schema:llmSchema}),
    system:`Tu conçois des sites de commerces locaux. Français excellent, ton naturel et commercial mais factuel. N'INVENTE jamais prix, certifications, années d'expérience, récompenses, marques, services non confirmés, adresse ou téléphone. Si les faits sont minces, reste général. services : uniquement ceux présents dans les faits (pour chacun, une description courte et factuelle, sans prix, durée ni marque), sinon liste vide. highlights : exactement 3 atouts généraux liés à la nature du métier (ex. réservation simple, trajets à la demande), sans chiffres, sans promesse vérifiable, sans fait inventé. heroTitle : accrocheur et court (pas le nom seul). aboutText : vide si tu n'as pas de faits. Couleurs en hex #RRGGBB harmonieuses. Choisis le template adapté au secteur.`,
    prompt:`Faits vérifiés :\n${JSON.stringify(facts)}`});
  return siteSchema.parse(apply(c,{
    business:{name:facts.name,category:facts.category??"Commerce local",city:facts.city,address:facts.address,phone:facts.phone,website:facts.website,email:facts.email,openingHours:facts.openingHours,socialLinks:facts.socialLinks},
    hero:{image:photos.hero},
    gallery:photos.gallery.length?photos.gallery.map(g=>({url:g.url,alt:`${facts.name} – photo`,source:"site-officiel"})):undefined,
    contact:{phone:facts.phone,address:facts.address,mapUrl:facts.address?`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${facts.address} ${facts.city}`)}`:undefined},
  }));
}

export async function editSite(site:GeneratedSite,instruction:string):Promise<{site:GeneratedSite;note:string}>{
  const current:LlmContent={template:site.template,primaryColor:site.branding.primaryColor,secondaryColor:site.branding.secondaryColor,font:site.branding.font,style:site.branding.style,mode:site.branding.mode??(["premium","bold","garage","restaurant","boutique"].includes(site.template)?"dark":"light"),
    heroTitle:site.hero.title,heroSubtitle:site.hero.subtitle,ctaLabel:site.hero.cta.label,ctaAction:site.hero.cta.action as LlmContent["ctaAction"],
    aboutTitle:site.about?.title??"",aboutText:site.about?.text??"",services:site.services.map(s=>({name:s.name,description:s.description})),
    highlights:site.highlights??[],seoTitle:site.seo.title,seoDescription:site.seo.description,showGallery:!!site.gallery?.length,note:""};
  const {output}=await generateText({model:getModel(),output:Output.object({schema:llmEditSchema}),
    system:"Tu modifies le contenu et le style d'un site. Applique UNIQUEMENT la demande, recopie le reste à l'identique. N'invente aucun fait (prix, adresse, téléphone, services). Couleurs en hex #RRGGBB. mode = dark pour un fond noir/sombre, light pour un fond clair ; pour « noir et doré » : mode dark, couleurs dorées (ex. #C9A227) et sombres. showGallery=false pour supprimer la galerie. note : UNE phrase en français décrivant ce que tu as modifié ; si la demande est impossible avec ces champs (ex. réordonner une photo, ajouter une section tarifs sans prix fournis), ne change rien et explique-le dans note.",
    prompt:`Contenu actuel :\n${JSON.stringify(current)}\n\nDemande : ${instruction}`});
  const {showGallery,note,...c}=output;
  return {note,site:siteSchema.parse(apply(c,{business:site.business,hero:{image:site.hero.image},gallery:showGallery?site.gallery:undefined,contact:site.contact},site))};
}
