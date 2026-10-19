import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { processSteps } from '../../data/content.ts'
import { sectionNumber } from '../../lib/content.ts'
import { ButtonLink } from '../ui/Button.tsx'
import { LightPanel } from '../ui/LightPanel.tsx'
import { Reveal } from '../ui/Reveal.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'

function Marker({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const threshold = index / processSteps.length
  const fill = useTransform(progress, [threshold, threshold + 0.08], [0, 1])
  const idle = useTransform(fill, [0, 1], [1, 0])
  return (
    <span className="chamfer chamfer-sm relative grid size-12 shrink-0 place-items-center bg-ink font-mono text-sm font-semibold">
      <motion.span style={{ opacity: fill, scale: fill }} className="absolute inset-0 bg-accent-strong" />
      <motion.span style={{ opacity: idle }} className="relative text-ink">
        0{index + 1}
      </motion.span>
      <motion.span style={{ opacity: fill }} className="absolute text-white">
        0{index + 1}
      </motion.span>
    </span>
  )
}

export function Process() {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.55'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const lineScale = reduce ? 1 : progress

  return (
    <LightPanel id="processo" labelledBy="processo-title" rounded>
      <div className="container-page py-24 sm:py-32">
        <SectionHeading
          id="processo-title"
          index={sectionNumber('processo')}
          eyebrow="Como funciona a contratação"
          tone="light"
          title="Como *funciona.*"
          intro={undefined}
        />

        <ol ref={ref} className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          {/* Linha de progresso: horizontal no desktop, vertical no celular */}
          <span aria-hidden className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px bg-ink/10 md:block" />
          <motion.span aria-hidden style={{ scaleX: lineScale }} className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-px origin-left bg-accent-strong md:block" />

          {processSteps.map((step, i) => (
            <li key={step.title} className="relative flex gap-6 md:flex-col md:items-center md:text-center">
              {i < processSteps.length - 1 && (
                <motion.span
                  aria-hidden
                  className="absolute top-12 -bottom-10 left-6 w-px origin-top bg-accent-strong/70 md:hidden"
                  initial={reduce ? false : { scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: '0px 0px -30% 0px' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <Marker index={i} progress={progress} />
              <Reveal delay={i * 0.08} className="flex-1">
                <h3 className="display text-base">{step.title}</h3>
                              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="chamfer chamfer-lg mt-16 flex flex-col items-start gap-6 bg-accent p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <p className="display text-xl">Receba sua proposta em poucos passos.</p>
                      </div>
          <ButtonLink href="#contato" variant="secondary" className="!text-accent [&>span:first-child]:!bg-white">Pedir orçamento</ButtonLink>
        </Reveal>
      </div>
    </LightPanel>
  )
}
