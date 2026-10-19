import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { company } from '../../data/company.ts'
import { about } from '../../data/content.ts'
import { sectionNumber } from '../../lib/content.ts'
import { Icon } from '../ui/Icon.tsx'
import { StatusBadge } from '../ui/Pending.tsx'
import { Reveal } from '../ui/Reveal.tsx'

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  // Piso de 0.4 mantém contraste mínimo de 3:1 (texto grande) antes da revelação.
  const opacity = useTransform(progress, range, [0.4, 1])
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{' '}
    </motion.span>
  )
}

/** Manifesto revelado palavra a palavra conforme a rolagem. */
function Statement() {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = about.statement.split(' ')
  const className = 'display text-[clamp(1.4rem,2.4vw,2.2rem)] leading-[1.2]'

  if (reduce)
    return (
      <p ref={ref} className={className}>
        {about.statement}
      </p>
    )
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{about.statement}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {w}
          </Word>
        ))}
      </span>
    </p>
  )
}

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(54_169_232/0.1),transparent)]" />
      <div className="container-page relative">
        <Reveal className="eyebrow mb-10 flex flex-wrap items-center gap-3 text-accent">
          <span className="tabular">{sectionNumber('sobre')}</span>
          <span aria-hidden className="h-px w-10 bg-current opacity-60" />
          <h2 id="sobre-title">Sobre a {company.name}</h2>
          {!about.reviewed && <StatusBadge kind="draft" />}
        </Reveal>

        <div className="max-w-4xl">
          <Statement />
        </div>


        <div className="mt-20">
          <Reveal>
            <h3 className="display text-2xl sm:text-3xl">Nossos compromissos</h3>
          </Reveal>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.commitments.map((c, i) => (
              <li key={c.title}>
                <Reveal delay={i * 0.07} className="group h-full border-t border-line pt-6">
                  <span className="chamfer chamfer-sm mb-5 grid size-12 place-items-center bg-ice/[0.07] text-accent transition-[transform,border-color] duration-500 ease-out-quint group-hover:-translate-y-1 group-hover:border-accent/60">
                    <Icon name={c.icon} className="size-5" />
                  </span>
                  <h4 className="text-lg font-semibold">{c.title}</h4>
                  <p className="mt-2 text-metal">{c.description}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
