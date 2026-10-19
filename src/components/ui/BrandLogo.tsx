import { company } from '../../data/company.ts'

/** Logotipo oficial quando configurado; caso contrário, monograma tipográfico provisório. */
export function BrandLogo({ className = '' }: { className?: string }) {
  if (company.logo) {
    return <img src={company.logo} alt={company.name} className={`h-9 w-auto ${className}`} width={160} height={36} />
  }
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span aria-hidden className="chamfer chamfer-sm relative grid size-9 place-items-center bg-accent text-[0.82rem] text-ink display">
        {company.monogram}
      </span>
      <span className="display text-[1.05rem] whitespace-nowrap">{company.name}</span>
    </span>
  )
}
