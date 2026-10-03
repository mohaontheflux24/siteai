import { z } from "zod";
export const businessRequestSchema = z.object({
  name: z.string().trim().min(2,"Indiquez le nom du commerce."),
  city: z.string().trim().min(2,"Indiquez la ville."),
  phone: z.string().trim().max(30).optional().transform(v=>v||undefined),
  address: z.string().trim().max(160).optional().transform(v=>v||undefined),
  services: z.string().trim().max(600).optional().transform(v=>v||undefined),
  about: z.string().trim().max(800).optional().transform(v=>v||undefined),
  url: z.string().trim().optional().transform(v=>v||undefined)
    .refine(v=>!v||/^https?:\/\/.+\..+/.test(v),"L'adresse doit commencer par http:// ou https://"),
});
export type BusinessRequest = z.infer<typeof businessRequestSchema>;
