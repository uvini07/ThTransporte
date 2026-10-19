import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'

/**
 * Seção clara que "desliza" sobre a anterior: cantos arredondados e leve escala
 * que se resolvem conforme entra na tela, conectando visualmente as seções.
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
  /** Arredonda a base, encerrando o bloco claro antes de uma seção escura. */
  rounded?: boolean
}) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.25'] })
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.94, 1])
  const radius = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [48, 0])

  return (
    <section ref={ref} id={id} aria-labelledby={labelledBy} className={`theme-light relative ${className}`}>
      <motion.div style={{ scale, borderTopLeftRadius: radius, borderTopRightRadius: radius }} className={`origin-top overflow-hidden bg-ice text-ink [color-scheme:light] ${rounded ? 'rounded-b-[2rem] sm:rounded-b-[3rem]' : ''}`}>
        {children}
      </motion.div>
    </section>
  )
}
