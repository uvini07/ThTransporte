import type { Transition, Variants } from 'motion/react'

/** Curvas e durações compartilhadas por todo o site. */
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
}

export const duration = { fast: 0.35, base: 0.7, slow: 1.1 }

export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: duration.base, ease: ease.out } },
}

export const stagger = (step = 0.08, delay = 0): Transition => ({ staggerChildren: step, delayChildren: delay })
