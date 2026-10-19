import type { ReactNode } from 'react'
import type { Photo, VisualVariant } from '../../types/index.ts'
import { StatusBadge } from '../ui/Pending.tsx'
import { Vehicle } from './Vehicle.tsx'

type Props = {
  image: Photo | null
  /** Descrição usada na ilustração quando não há foto. */
  alt: string
  variant: VisualVariant
  tone?: 'dark' | 'light'
  className?: string
  /** Classes aplicadas à imagem/ilustração interna (ex.: transições de hover). */
  innerClassName?: string
  children?: ReactNode
  draw?: boolean
  loading?: 'lazy' | 'eager'
  sizes?: string
  /** Posição do selo de status. */
  badgeClassName?: string
  /** Exibe o selo de imagem/foto ilustrativa. */
  badge?: boolean
}

/**
 * Exibe a foto quando existir (com selo "Foto ilustrativa" se não for oficial);
 * caso contrário, uma ilustração técnica com o selo "Imagem ilustrativa".
 */
export function MediaFrame({
  image,
  alt,
  variant,
  tone = 'dark',
  className = '',
  innerClassName = '',
  children,
  draw,
  loading = 'lazy',
  sizes = '(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw',
  badgeClassName = 'top-4 left-4',
  badge = true,
}: Props) {
  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      {image ? (
        <>
          <img
            src={image.src}
            srcSet={image.srcSet}
            sizes={sizes}
            alt={image.alt}
            loading={loading}
            decoding="async"
            style={{ objectPosition: image.position }}
            className={`absolute inset-0 size-full object-cover ${innerClassName}`}
          />
          {badge && !image.official && <StatusBadge kind="illustrative" label="Foto ilustrativa" tone="dark" className={`absolute z-10 ${badgeClassName}`} />}
        </>
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
          {badge && <StatusBadge kind="illustrative" tone={tone} className={`absolute z-10 ${badgeClassName}`} />}
        </>
      )}
      {children}
    </div>
  )
}
