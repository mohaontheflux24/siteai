import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "SiteAI – Le site de votre commerce, créé par l'IA", description: "Donnez le nom de votre commerce et la ville. L'IA crée votre site." };
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="fr"><body className="min-h-screen">{children}</body></html>;
}
