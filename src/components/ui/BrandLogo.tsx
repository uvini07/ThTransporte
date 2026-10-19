import { company } from '../../data/company.ts'

/** Logotipo oficial quando configurado; caso contrário, monograma tipográfico provisório. */
export function BrandLogo({ className = '' }: { className?: string }) {
  if (company.logo) {
    return <img src={company.logo} alt={company.name} className={`h-9 w-auto ${className}`} width={160} height={36} />
  }
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span aria-hidden className="relative grid size-9 place-items-center rounded-[10px] border border-accent/40 bg-accent/10 font-mono text-[0.8rem] font-semibold tracking-tight text-accent">
        {company.monogram}
        <span className="absolute -right-0.5 -bottom-0.5 size-2 rounded-full bg-accent" />
      </span>
      <span className="text-[1.05rem] font-semibold tracking-[-0.02em] whitespace-nowrap">{company.name}</span>
    </span>
  )
}
