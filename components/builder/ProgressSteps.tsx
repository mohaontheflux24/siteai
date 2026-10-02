import type { BuildStep } from "@/types/site";
const icon={done:"✓",active:"•",pending:"",error:"!"} as const;
export function ProgressSteps({steps}:{steps:BuildStep[]}){
  return <ol className="grid gap-1" aria-live="polite">{steps.map(s=>
    <li key={s.id} className={`flex items-center gap-4 rounded-lg px-3 py-3 ${s.status==="active"?"bg-[var(--card)]":""}`}>
      <span aria-hidden className={`grid size-7 shrink-0 place-items-center rounded-full border text-sm ${s.status==="done"?"border-[var(--brand)] bg-[var(--brand)] text-[var(--brand-ink)]":s.status==="error"?"border-red-600 text-red-600":"border-[var(--line)] text-[var(--brand)]"}`}>{icon[s.status]}</span>
      <span className={s.status==="pending"?"text-[var(--muted)]":"font-medium"}>{s.label}</span>
      <span className="sr-only">{s.status}</span>
    </li>)}</ol>;
}
