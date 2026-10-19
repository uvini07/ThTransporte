import { motion, type HTMLMotionProps } from 'motion/react'
import { fadeUp, viewportOnce } from '../../lib/motion.ts'

/** Entrada padrão (fade + blur + deslocamento) ao entrar na viewport. */
export function Reveal({ delay = 0, ...props }: HTMLMotionProps<'div'> & { delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={fadeUp}
      transition={{ delay }}
      {...props}
    />
  )
}
