import { BusinessForm } from "@/components/builder/BusinessForm";
export default function Home(){
  return <main className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_.9fr]">
    <section className="rise">
      <p className="mb-6 text-lg font-semibold">SiteAI</p>
      <h1 className="text-5xl leading-[1.05] sm:text-6xl">Créez le site de votre commerce avec l'IA</h1>
      <p className="mt-6 max-w-md text-lg text-[var(--muted)]">Donnez-nous simplement le nom de votre commerce. Notre IA s'occupe du reste.</p>
    </section>
    <section className="rise rounded-2xl border border-[var(--line)] bg-[var(--card)] p-7 sm:p-9" style={{animationDelay:".12s"}}>
      <BusinessForm/>
    </section>
  </main>;
}
