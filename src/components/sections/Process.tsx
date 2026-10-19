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
    <span className="relative grid size-12 place-items-center rounded-full border border-ink/15 bg-ice font-mono text-sm font-semibold">
      <motion.span style={{ opacity: fill, scale: fill }} className="absolute inset-0 rounded-full bg-accent-strong" />
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
          title="Da primeira conversa à operação rodando."
          intro="Um processo objetivo, do diagnóstico da sua operação à implantação."
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
                <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-slate md:mx-auto md:max-w-[24ch]">{step.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-16 flex flex-col items-start gap-6 rounded-[1.5rem] bg-ink p-8 text-ice sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <p className="text-2xl font-semibold tracking-tight">Pronto para dimensionar a sua operação?</p>
            <p className="mt-2 text-metal">Conte o que você precisa e retornamos com uma proposta.</p>
          </div>
          <ButtonLink href="#contato">Iniciar conversa comercial</ButtonLink>
        </Reveal>
      </div>
    </LightPanel>
  )
}
