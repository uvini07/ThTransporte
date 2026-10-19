import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { formatNumber } from '../../lib/format.ts'

/** Contador animado que parte de zero quando entra na tela. */
export function Counter({ value, className = '', suffix = '' }: { value: number; className?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || !inView) return
    if (reduce) {
      node.textContent = formatNumber(value) + suffix
      return
    }
    const controls = animate(0, value, {
      duration: Math.min(2.2, 0.8 + value / 400),
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (node.textContent = formatNumber(Math.round(v)) + suffix),
    })
    return () => controls.stop()
  }, [inView, value, suffix, reduce])

  return (
    <span className={`tabular ${className}`}>
      <span ref={ref} aria-hidden>
        0{suffix}
      </span>
      <span className="sr-only">
        {formatNumber(value)}
        {suffix}
      </span>
    </span>
  )
}
