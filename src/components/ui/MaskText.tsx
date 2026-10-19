import { motion } from 'motion/react'
import { ease, viewportOnce } from '../../lib/motion.ts'

type Props = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  delay?: number
  /** Anima ao montar (hero) em vez de ao entrar na viewport. */
  immediate?: boolean
  id?: string
}

/** Revela o texto palavra a palavra por máscara. O texto completo fica acessível a leitores de tela. */
export function MaskText({ text, as = 'h2', className = '', delay = 0, immediate = false, id }: Props) {
  const Tag = motion[as]
  const words = text.split(' ')
  const trigger = immediate ? { animate: 'show' } : { whileInView: 'show', viewport: viewportOnce }
  return (
    <Tag id={id} className={className} initial="hidden" {...trigger} >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-flex overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%' },
              show: { y: '0%', transition: { duration: 0.9, ease: ease.out, delay: delay + i * 0.045 } },
            }}
          >
            {word}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
