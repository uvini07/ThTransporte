import { visibleServices } from '../../lib/content.ts'

/**
 * Faixas inclinadas em movimento, como fitas de sinalização de pista.
 * Conteúdo decorativo (as mesmas palavras estão nos títulos dos serviços).
 */
export function Marquee() {
  const words = visibleServices.length ? visibleServices.map((s) => s.label) : ['Executivo', 'Corporativo', 'Eventos', 'Logística']
  const row = [...words, ...words, ...words]

  return (
    <div aria-hidden className="relative z-10 -mt-[5vw] h-[clamp(5rem,9vw,7.5rem)] [overflow:clip]">
      <div className="absolute top-1/2 left-[-5%] w-[110%] -translate-y-1/2 -rotate-[2deg] bg-accent py-2 shadow-[0_20px_60px_-20px_rgb(240_90_26/0.6)]">
        <div className="flex w-max animate-marquee-fast">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {row.map((w, i) => (
                <span key={`${copy}-${i}`} className="display flex items-center gap-6 px-6 text-[clamp(1rem,1.8vw,1.5rem)] text-ice uppercase">
                  <span className="inline-block -skew-x-[10deg]">{w}</span>
                  <svg viewBox="0 0 24 24" className="size-[0.8em]" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 4l8 8-8 8M12 4l8 8-8 8" />
                  </svg>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
