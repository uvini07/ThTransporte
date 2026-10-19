import type { ReactNode } from 'react'
import type { VisualVariant } from '../../types/index.ts'
import { StatusBadge } from '../ui/Pending.tsx'
import { Vehicle } from './Vehicle.tsx'

type Props = {
  image: string | null
  alt: string
  variant: VisualVariant
  tone?: 'dark' | 'light'
  className?: string
  /** Classes aplicadas à imagem/ilustração interna (ex.: transições de hover). */
  innerClassName?: string
  children?: ReactNode
  draw?: boolean
  loading?: 'lazy' | 'eager'
}

/**
 * Exibe a fotografia oficial quando existir; caso contrário, uma ilustração técnica
 * identificada com o selo "Imagem ilustrativa".
 */
export function MediaFrame({ image, alt, variant, tone = 'dark', className = '', innerClassName = '', children, draw, loading = 'lazy' }: Props) {
  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      {image ? (
        <img src={image} alt={alt} loading={loading} decoding="async" className={`absolute inset-0 size-full object-cover ${innerClassName}`} />
      ) : (
        <>
          <div aria-hidden className="absolute inset-0 bg-grid opacity-70" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                tone === 'dark'
                  ? 'radial-gradient(60% 55% at 50% 60%, rgb(54 169 232 / 0.14), transparent 70%)'
                  : 'radial-gradient(60% 55% at 50% 60%, rgb(54 169 232 / 0.18), transparent 70%)',
            }}
          />
          <div className={`absolute inset-0 flex items-center justify-center p-[6%] ${innerClassName}`}>
            <Vehicle variant={variant} className="w-full max-w-[34rem] drop-shadow-[0_30px_40px_rgb(0_0_0/0.35)]" draw={draw} title={`${alt} — ilustração`} />
          </div>
          <StatusBadge kind="illustrative" tone={tone} className="absolute top-4 left-4 z-10" />
        </>
      )}
      {children}
    </div>
  )
}
