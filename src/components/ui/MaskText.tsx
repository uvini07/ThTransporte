import { motion } from 'motion/react'
import { ease, viewportOnce } from '../../lib/motion.ts'

type Props = {
  /** Trechos entre *asteriscos* recebem o destaque (itálico na cor de acento). */
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  delay?: number
  /** Anima ao montar (hero) em vez de ao entrar na viewport. */
  immediate?: boolean
  id?: string
}

/** Separa o texto em palavras, marcando as que estão dentro de *destaque*. */
function tokenize(text: string) {
  const words: { word: string; accent: boolean }[] = []
  text.split(/(\*[^*]+\*)/).forEach((chunk) => {
    const accent = chunk.startsWith('*') && chunk.endsWith('*')
    chunk
      .replace(/^\*|\*$/g, '')
      .split(' ')
      .filter(Boolean)
      .forEach((word) => words.push({ word, accent }))
  })
  return words
}

const plainText = (text: string) => text.replace(/\*/g, '')

/** Revela o texto palavra a palavra por máscara. O texto completo fica acessível a leitores de tela. */
export function MaskText({ text, as = 'h2', className = '', delay = 0, immediate = false, id }: Props) {
  const Tag = motion[as]
  const words = tokenize(text)
  const trigger = immediate ? { animate: 'show' } : { whileInView: 'show', viewport: viewportOnce }
  return (
    <Tag id={id} className={className} initial="hidden" {...trigger}>
      <span className="sr-only">{plainText(text)}</span>
      {words.map(({ word, accent }, i) => (
        <span key={i} aria-hidden className="inline-flex overflow-hidden pr-[0.06em] pb-[0.14em] -mb-[0.14em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', skewY: 6 },
              show: { y: '0%', skewY: 0, transition: { duration: 0.9, ease: ease.out, delay: delay + i * 0.045 } },
            }}
          >
            {accent ? <span className="display-accent">{word}</span> : word}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
