import type { GeneratedSite } from "@/lib/site/schema";
const I={
  phone:<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>,
  pin:<path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zm0-8.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>,
  clock:<path d="M12 7v5l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"/>,
  arrow:<path d="M5 12h14m-6-6l6 6-6 6"/>,
};
const Icon=({n,c="size-5"}:{n:keyof typeof I;c?:string})=><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={c} aria-hidden>{I[n]}</svg>;
const DARK=["premium","bold","garage","restaurant","boutique"];
export function SiteRenderer({site}:{site:GeneratedSite}){
  const {business:b,branding:br,hero,about,services,gallery,contact,highlights}=site;
  const dark=br.mode?br.mode==="dark":DARK.includes(site.template), sharp=["minimal","bold","cabinet"].includes(site.template), serif=br.font==="serif";
  const r=sharp?"rounded-none":"rounded-2xl";
  const href=hero.cta.action==="call"&&contact.phone?`tel:${contact.phone}`:hero.cta.action==="directions"&&contact.mapUrl?contact.mapUrl:"#contact";
  const v={"--p":br.primaryColor,"--s":br.secondaryColor,"--bg":dark?"#0c0c0e":"#fbfaf8","--card":dark?"#17171a":"#ffffff","--fg":dark?"#f5f3ee":"#16161a","--mu":dark?"#a3a3ad":"#5b5b66","--ln":dark?"#2a2a30":"#e6e3dc",background:"var(--bg)",color:"var(--fg)",fontFamily:'system-ui,"Segoe UI",sans-serif'} as React.CSSProperties;
  const head={fontFamily:serif?'"Iowan Old Style",Georgia,serif':'system-ui,"Segoe UI",sans-serif',letterSpacing:"-0.025em"};
  const btn=`inline-flex items-center gap-2 ${sharp?"":"rounded-full"} px-6 py-3.5 font-semibold transition hover:-translate-y-0.5`;
  const bg=hero.image?`linear-gradient(180deg,rgba(0,0,0,.25),rgba(0,0,0,.75)),url(${hero.image}) center/cover`:`radial-gradient(900px 500px at 85% 0%,${br.secondaryColor}88,transparent 60%),radial-gradient(700px 500px at 0% 100%,${br.primaryColor},transparent 65%),#101014`;
  const h2="text-3xl font-semibold @md:text-5xl";
  const sec="mx-auto max-w-6xl px-6 py-16 @md:py-24";
  return <div style={v} className="@container">
    <header className="sticky top-0 z-10 border-b backdrop-blur" style={{borderColor:"var(--ln)",background:dark?"rgba(12,12,14,.8)":"rgba(251,250,248,.85)"}}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="text-lg font-semibold" style={head}>{b.name}</span>
        <nav className="flex items-center gap-5 text-sm" aria-label="Navigation">
          {services.length>0&&<a href="#services" className="hidden @md:inline">Services</a>}{gallery&&gallery.length>0&&<a href="#galerie" className="hidden @md:inline">Galerie</a>}
          <a href="#contact" className={`${sharp?"":"rounded-full"} px-4 py-2 font-medium text-white`} style={{background:"var(--p)"}}>Contact</a></nav></div></header>

    <section className="relative isolate overflow-hidden text-white" style={{background:bg}}>
      {!hero.image&&<div aria-hidden className="absolute inset-0 -z-10 opacity-[.07]" style={{backgroundImage:"linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",backgroundSize:"48px 48px"}}/>}
      <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-6 pb-16 pt-28">
        <p className="mb-5 inline-flex w-fit items-center gap-2 border border-white/25 px-3 py-1.5 text-xs uppercase tracking-[.2em] backdrop-blur" style={{borderRadius:sharp?0:999}}>{b.category} · {b.city}</p>
        <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] @md:text-7xl" style={head}>{hero.title}</h1>
        <p className="mt-6 max-w-xl text-lg text-white/80 @md:text-xl">{hero.subtitle}</p>
        <div className="mt-9 flex flex-wrap gap-3"><a href={href} className={`${btn} bg-white`} style={{color:"var(--p)"}}>{hero.cta.label}<Icon n="arrow" c="size-4"/></a>
          {contact.phone&&hero.cta.action!=="call"&&<a href={`tel:${contact.phone}`} className={`${btn} border border-white/40`}><Icon n="phone" c="size-4"/>{contact.phone}</a>}</div></div></section>

    {highlights&&highlights.length>0&&<section className={sec}><div className="grid gap-px overflow-hidden border @md:grid-cols-3" style={{borderColor:"var(--ln)",background:"var(--ln)",borderRadius:sharp?0:24}}>
      {highlights.map((h,i)=><div key={h.title} className="p-8" style={{background:"var(--card)"}}><span className="text-sm font-semibold" style={{color:"var(--p)"}}>0{i+1}</span><h3 className="mt-3 text-xl font-semibold" style={head}>{h.title}</h3><p className="mt-2 text-sm leading-relaxed" style={{color:"var(--mu)"}}>{h.text}</p></div>)}</div></section>}

    {services.length>0&&<section id="services" className={sec}><p className="text-sm font-semibold uppercase tracking-[.2em]" style={{color:"var(--p)"}}>Services</p><h2 className={`mt-3 ${h2}`} style={head}>Ce que nous faisons pour vous</h2>
      <div className="mt-12 grid gap-5 @md:grid-cols-2 @3xl:grid-cols-3">{services.map((s,i)=><article key={s.name} className={`border p-7 ${r}`} style={{borderColor:"var(--ln)",background:"var(--card)"}}>
        <span className="grid size-10 place-items-center text-sm font-semibold text-white" style={{background:"var(--p)",borderRadius:sharp?0:12}}>{i+1}</span>
        <h3 className="mt-5 text-xl font-semibold" style={head}>{s.name}</h3><p className="mt-2 leading-relaxed" style={{color:"var(--mu)"}}>{s.description}</p>{s.price&&<p className="mt-4 font-semibold" style={{color:"var(--p)"}}>{s.price}</p>}</article>)}</div></section>}

    {about&&<section className={sec}><div className="grid gap-10 @md:grid-cols-[1fr_1.4fr] @md:items-start"><h2 className={h2} style={head}>{about.title}</h2>
      <p className="text-lg leading-relaxed @md:text-xl" style={{color:"var(--mu)"}}>{about.text}</p></div></section>}

    {gallery&&gallery.length>0&&<section id="galerie" className={sec}><h2 className={h2} style={head}>Galerie</h2>
      <div className="mt-10 grid grid-cols-2 gap-3 @md:grid-cols-3">{gallery.map((g,i)=>/* eslint-disable-next-line @next/next/no-img-element */<img key={g.url} src={g.url} alt={g.alt} loading="lazy" className={`w-full object-cover ${r} ${i===0?"col-span-2 row-span-2 aspect-square @md:aspect-auto @md:h-full":"aspect-[4/3]"}`}/>)}</div>
      {gallery.some(g=>g.illustrative)&&<p className="mt-3 text-xs" style={{color:"var(--mu)"}}>Images illustratives.</p>}</section>}

    <section className="px-6 py-16 text-white @md:py-20" style={{background:`linear-gradient(120deg,${br.primaryColor},${br.secondaryColor})`}}><div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 @md:flex-row @md:items-center">
      <h2 className="max-w-xl text-3xl font-semibold @md:text-4xl" style={head}>{hero.cta.label} dès aujourd'hui</h2><a href={href} className={`${btn} bg-white`} style={{color:"var(--p)"}}>{hero.cta.label}<Icon n="arrow" c="size-4"/></a></div></section>

    <section id="contact" className={sec}><h2 className={h2} style={head}>Contact</h2>
      <div className="mt-10 grid gap-4 @md:grid-cols-3">{([["phone","Téléphone",contact.phone,contact.phone?`tel:${contact.phone}`:undefined],["pin","Adresse",contact.address?`${contact.address}, ${b.city}`:b.city,contact.mapUrl],["clock","Horaires",b.openingHours?.join(" · "),undefined]] as const).filter(x=>x[2]).map(([ic,l,val,link])=>
        <div key={l} className={`border p-6 ${r}`} style={{borderColor:"var(--ln)",background:"var(--card)"}}><span style={{color:"var(--p)"}}><Icon n={ic}/></span><p className="mt-4 text-xs uppercase tracking-widest" style={{color:"var(--mu)"}}>{l}</p>
          {link?<a href={link} className="mt-1 block text-lg font-medium underline-offset-4 hover:underline">{val}</a>:<p className="mt-1 text-lg font-medium">{val}</p>}</div>)}</div></section>

    <footer className="border-t" style={{borderColor:"var(--ln)"}}><div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-6 py-8 text-sm" style={{color:"var(--mu)"}}><span>© {new Date().getFullYear()} {b.name} · {b.city}</span>
      <span className="flex gap-4">{b.socialLinks?.map(l=><a key={l} href={l} rel="noopener">{new URL(l).hostname.replace("www.","").split(".")[0]}</a>)}</span></div></footer>
  </div>;
}
