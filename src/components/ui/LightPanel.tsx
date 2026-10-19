import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'

/**
 * Seção clara com corte diagonal no topo (e opcionalmente na base). A inclinação
 * se ajusta durante a rolagem, conectando visualmente as seções.
 */
export function LightPanel({
  children,
  id,
  labelledBy,
  className = '',
  rounded = false,
}: {
  children: ReactNode
  id: string
  labelledBy: string
  className?: string
  /** Corta a base na diagonal, encerrando o bloco claro antes de uma seção escura. */
  rounded?: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.25'] })
  // A diagonal do topo "assenta" conforme a seção entra: começa íngreme e termina suave.
  const slant = useTransform(scrollYProgress, [0, 1], reduce ? [5, 5] : [12, 5])
  const clipPath = useTransform(slant, (v) => `polygon(0 ${v}vw, 100% 0, 100% 100%, 0 100%)`)
  const clipPathRounded = useTransform(slant, (v) => `polygon(0 ${v}vw, 100% 0, 100% calc(100% - 5vw), 0 100%)`)

  return (
    <section ref={ref} id={id} aria-labelledby={labelledBy} className={`relative ${className}`}>
      <motion.div
        style={{ clipPath: rounded ? clipPathRounded : clipPath }}
        className={`bg-graphite pt-[5vw] text-ice ${rounded ? 'pb-[5vw]' : ''}`}
      >
        {children}
      </motion.div>
    </section>
  )
}
