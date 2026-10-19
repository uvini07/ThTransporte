import type { ReactNode } from 'react'
import { MaskText } from './MaskText.tsx'
import { Reveal } from './Reveal.tsx'

type Props = {
  index: string
  eyebrow: string
  /** Aceita *destaque* em itálico. */
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
    <div className={`relative ${stacked ? '' : 'grid gap-8 lg:grid-cols-12 lg:items-end'}`}>
      <div className={`relative ${stacked ? '' : 'lg:col-span-8'}`}>
        <Reveal className={`eyebrow mb-6 flex items-center gap-3 ${tone === 'dark' ? 'text-accent' : 'text-accent-strong'}`}>
          <span className="tabular">{index}</span>
          <span aria-hidden className="lane animate-lane h-[2px] w-12 opacity-70" />
          <span>{eyebrow}</span>
        </Reveal>
        <MaskText id={id} text={title} className="display text-[clamp(1.7rem,3vw,2.75rem)] leading-[1.05]" />
      </div>
      {(intro || aside) && (
        <Reveal delay={0.15} className={`relative lg:col-span-4 ${muted} max-w-sm text-[0.95rem] leading-relaxed`}>
          {intro}
          {aside}
        </Reveal>
      )}
    </div>
  )
}
