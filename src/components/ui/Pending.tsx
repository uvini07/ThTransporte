import type { ReactNode } from 'react'
import { isDemo } from '../../lib/config.ts'

type Tone = 'dark' | 'light'

/** Marcador visual para dados ainda não fornecidos pela empresa. */
export function Pending({ label = 'A informar', tone = 'dark', className = '' }: { label?: string; tone?: Tone; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-dashed px-2 py-0.5 font-mono text-[0.7rem] font-medium tracking-wide uppercase ${
        tone === 'dark' ? 'border-warn/50 text-warn' : 'border-[#9a6a12]/50 text-[#7a520a]'
      } ${className}`}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  )
}

/**
 * Renderiza um dado confirmado; no modo demonstração mostra "A informar" quando vazio,
 * na versão pública não renderiza nada.
 */
export function DataValue<T>({
  value,
  children,
  tone,
  pendingLabel,
}: {
  value: T | null | undefined
  children: (value: T) => ReactNode
  tone?: Tone
  pendingLabel?: string
}) {
  if (value !== null && value !== undefined && value !== '') return <>{children(value)}</>
  return isDemo ? <Pending tone={tone} label={pendingLabel} /> : null
}

type BadgeKind = 'confirm' | 'illustrative' | 'draft'

const badgeText: Record<BadgeKind, string> = {
  confirm: 'A confirmar',
  illustrative: 'Imagem ilustrativa',
  draft: 'Texto provisório',
}

/** Selo de status para conteúdo não confirmado. Só aparece no modo demonstração (exceto "ilustrativa"). */
export function StatusBadge({ kind, tone = 'dark', className = '', label }: { kind: BadgeKind; tone?: Tone; className?: string; label?: string }) {
  if (kind !== 'illustrative' && !isDemo) return null
  const styles =
    kind === 'illustrative'
      ? tone === 'dark'
        ? 'border-metal/30 bg-ink/70 text-metal'
        : 'border-slate/30 bg-white/80 text-slate'
      : tone === 'dark'
        ? 'border-warn/40 bg-warn/10 text-warn'
        : 'border-[#9a6a12]/40 bg-[#f0b44c]/15 text-[#7a520a]'
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.65rem] font-medium tracking-wider uppercase backdrop-blur-sm ${styles} ${className}`}>
      {label ?? badgeText[kind]}
    </span>
  )
}
