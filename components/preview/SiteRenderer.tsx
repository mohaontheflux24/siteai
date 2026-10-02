import type { GeneratedSite } from "@/lib/site/schema";
export function SiteRenderer({site}:{site:GeneratedSite}){
  const {business:b,branding:br,hero,about,services,gallery,contact}=site;
  const serif=br.font==="serif", dark=["premium","bold"].includes(site.template);
  const href=hero.cta.action==="call"&&contact.phone?`tel:${contact.phone}`:hero.cta.action==="directions"&&contact.mapUrl?contact.mapUrl:"#contact";
  const vars={"--p":br.primaryColor,"--s":br.secondaryColor,"--bg":dark?"#0f0f10":"#fff","--fg":dark?"#f4f4f2":"#18181b","--mu":dark?"#a1a1aa":"#52525b",fontFamily:serif?"Georgia,serif":"system-ui,sans-serif"} as React.CSSProperties;
  const h2="text-3xl font-semibold tracking-tight";
  return <div style={{...vars,background:"var(--bg)",color:"var(--fg)"}} className="@container">
    <header className="flex items-center justify-between px-6 py-4">
      <strong className="text-lg">{b.name}</strong>
      <nav className="flex items-center gap-5 text-sm" aria-label="Navigation">
        {services.length>0&&<a href="#services">Services</a>}{gallery&&<a href="#galerie">Galerie</a>}<a href="#contact" className="rounded-full px-4 py-2 font-medium text-white" style={{background:"var(--p)"}}>Contact</a></nav>
    </header>
    <section className="relative grid min-h-[70vh] items-end px-6 pb-14 pt-24" style={{background:hero.image?`linear-gradient(to top,rgba(0,0,0,.7),rgba(0,0,0,.1)),url(${hero.image}) center/cover`:"linear-gradient(135deg,var(--p),var(--s))",color:"#fff"}}>
      <div className="max-w-2xl"><h1 className="text-4xl font-semibold leading-tight sm:text-6xl">{hero.title}</h1>
        <p className="mt-4 text-lg opacity-90">{hero.subtitle}</p>
        <a href={href} className="mt-7 inline-block rounded-full bg-white px-6 py-3 font-semibold" style={{color:"var(--p)"}}>{hero.cta.label}</a></div>
    </section>
    {services.length>0&&<section id="services" className="px-6 py-16"><h2 className={h2}>Nos services</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{services.map(s=><div key={s.name} className="border-t-2 pt-4" style={{borderColor:"var(--p)"}}><h3 className="font-semibold">{s.name}</h3><p className="mt-2 text-sm" style={{color:"var(--mu)"}}>{s.description}</p>{s.price&&<p className="mt-2 font-medium">{s.price}</p>}</div>)}</div></section>}
    {about&&<section className="px-6 py-16"><div className="max-w-2xl"><h2 className={h2}>{about.title}</h2><p className="mt-4 leading-relaxed" style={{color:"var(--mu)"}}>{about.text}</p></div></section>}
    {gallery&&gallery.length>0&&<section id="galerie" className="px-6 py-16"><h2 className={h2}>Galerie</h2>
      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3">{gallery.map(g=>/* eslint-disable-next-line @next/next/no-img-element */<img key={g.url} src={g.url} alt={g.alt} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover"/>)}</div>
      {gallery.some(g=>g.illustrative)&&<p className="mt-3 text-xs" style={{color:"var(--mu)"}}>Images illustratives.</p>}</section>}
    <section id="contact" className="px-6 py-16" style={{background:"var(--p)",color:"#fff"}}><h2 className={h2}>Contact</h2>
      <div className="mt-6 grid gap-2">{contact.address&&<p>{contact.address}, {b.city}</p>}{contact.phone&&<p><a href={`tel:${contact.phone}`} className="underline">{contact.phone}</a></p>}
        {b.openingHours?.map(h=><p key={h}>{h}</p>)}</div>
      <div className="mt-6 flex flex-wrap gap-3">{contact.phone&&<a href={`tel:${contact.phone}`} className="rounded-full bg-white px-5 py-2.5 font-medium" style={{color:"var(--p)"}}>Appeler</a>}{contact.mapUrl&&<a href={contact.mapUrl} className="rounded-full border border-white px-5 py-2.5 font-medium">Itinéraire</a>}</div></section>
    <footer className="flex flex-wrap justify-between gap-3 px-6 py-8 text-sm" style={{color:"var(--mu)"}}><span>© {new Date().getFullYear()} {b.name}</span>
      <span className="flex gap-4">{b.socialLinks?.map(l=><a key={l} href={l} rel="noopener">{new URL(l).hostname.replace("www.","").split(".")[0]}</a>)}</span></footer>
  </div>;
}
