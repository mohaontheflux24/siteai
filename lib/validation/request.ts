import { z } from "zod";
export const businessRequestSchema = z.object({
  name: z.string().trim().min(2,"Indiquez le nom du commerce."),
  city: z.string().trim().min(2,"Indiquez la ville."),
  url: z.string().trim().optional().transform(v=>v||undefined)
    .refine(v=>!v||/^https?:\/\/.+\..+/.test(v),"L'adresse doit commencer par http:// ou https://"),
});
export type BusinessRequest = z.infer<typeof businessRequestSchema>;
