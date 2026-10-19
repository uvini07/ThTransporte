import type { ReactNode } from 'react'
import { MaskText } from './MaskText.tsx'
import { Reveal } from './Reveal.tsx'

type Props = {
  index: string
  eyebrow: string
  title: string
  intro?: ReactNode
  id: string
  tone?: 'dark' | 'light'
  aside?: ReactNode
  /** Título em coluna única (para cabeçalhos dentro de colunas estreitas). */
  stacked?: boolean
}

export function SectionHeading({ index, eyebrow, title, intro, id, tone = 'dark', aside, stacked = false }: Props) {
  const muted = tone === 'dark' ? 'text-metal' : 'text-slate'
  return (
    <div className={stacked ? '' : 'grid gap-8 lg:grid-cols-12 lg:items-end'}>
      <div className={stacked ? '' : 'lg:col-span-8'}>
        <Reveal className={`eyebrow mb-6 flex items-center gap-3 ${tone === 'dark' ? 'text-accent' : 'text-accent-strong'}`}>
          <span className="tabular">{index}</span>
          <span aria-hidden className="h-px w-10 bg-current opacity-60" />
          <span>{eyebrow}</span>
        </Reveal>
        <MaskText id={id} text={title} className="text-[clamp(2.1rem,4.6vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.035em]" />
      </div>
      {(intro || aside) && (
        <Reveal delay={0.15} className={`lg:col-span-4 ${muted} text-base leading-relaxed sm:text-lg`}>
          {intro}
          {aside}
        </Reveal>
      )}
    </div>
  )
}
