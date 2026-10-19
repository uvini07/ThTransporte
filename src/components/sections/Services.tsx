import { AnimatePresence, motion } from 'motion/react'
import { Check } from 'lucide-react'
import { useState } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery.ts'
import { sectionNumber, visibleServices } from '../../lib/content.ts'
import { ease } from '../../lib/motion.ts'
import { prefillQuote } from '../../lib/quote.ts'
import type { Service } from '../../types/index.ts'
import { MediaFrame } from '../illustrations/MediaFrame.tsx'
import { ButtonLink } from '../ui/Button.tsx'
import { StatusBadge } from '../ui/Pending.tsx'
import { Reveal } from '../ui/Reveal.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'

const num = (i: number) => String(i + 1).padStart(2, '0')

function Details({ service, compact = false }: { service: Service; compact?: boolean }) {
  return (
    <>
      <p className={`max-w-lg leading-relaxed text-ice/75 ${compact ? 'text-[0.95rem]' : 'text-base'}`}>{service.description}</p>
      <ul className={`mt-6 grid gap-x-8 gap-y-2.5 ${compact ? '' : 'sm:grid-cols-2'}`}>
        {service.highlights.map((h) => (
          <li key={h} className="flex items-start gap-3 text-sm text-ice/90">
            <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden strokeWidth={2.5} />
            {h}
          </li>
        ))}
      </ul>
      <ButtonLink href="#contato" className="mt-8" onClick={() => prefillQuote({ service: service.id })}>
        Solicitar orçamento
      </ButtonLink>
    </>
  )
}

/** Desktop: painéis de foto lado a lado; o ativo se expande (hover, foco ou clique). */
function Panels() {
  const [active, setActive] = useState(0)

  return (
    <div className="mt-12 flex h-[min(34rem,70vh)] min-h-[28rem] gap-2">
      {visibleServices.map((service, i) => {
        const open = active === i
        return (
          <motion.article
            key={service.id}
            id={`svc-${service.id}`}
            aria-labelledby={`service-${service.id}`}
            className={`chamfer chamfer-lg relative min-w-0 overflow-hidden bg-graphite transition-[flex-grow] duration-700 ease-out-quint ${
              open ? 'grow-[5.5]' : 'grow'
            } basis-0`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.8, ease: ease.out, delay: i * 0.08 }}
            onMouseEnter={() => setActive(i)}
          >
            <div className="absolute inset-0">
              <MediaFrame
                image={service.image}
                alt={service.title}
                variant={service.visual}
                className="size-full [--vehicle-bg:var(--color-graphite)]"
                innerClassName={`transition-[transform,filter] duration-[1.2s] ease-out-quint ${open ? 'scale-100' : 'scale-110 grayscale brightness-[0.6]'}`}
                sizes="(min-width: 1024px) 60vw, 100vw"
                badge={open}
                badgeClassName="top-6 right-12"
              />
            </div>
            <div aria-hidden className={`absolute inset-0 transition-colors duration-700 ${open ? 'bg-transparent' : 'bg-[#0e1a2b]/35'}`} />
            <div
              aria-hidden
              className={`absolute inset-0 bg-gradient-to-t from-[#0e1a2b]/95 via-[#0e1a2b]/60 via-50% to-transparent transition-opacity duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Gatilho acessível: expande o painel */}
            <h3 id={`service-${service.id}`} className="sr-only">
              {service.title}
            </h3>
            {/* O botão permanece montado (o foco não se perde); quando aberto, encolhe para o canto. */}
            <button
              type="button"
              className={`group absolute z-20 flex flex-col items-center text-left [--color-ice:#ffffff] [--color-accent:#ff7a3d] ${open ? 'top-0 left-0 p-8 xl:p-10' : 'inset-0 justify-between py-8'}`}
              aria-expanded={open}
              aria-controls={`svc-body-${service.id}`}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              <span className="display text-2xl text-accent">{num(i)}</span>
              {!open && (
                <span
                  aria-hidden
                  className="display rotate-180 text-xl whitespace-nowrap text-ice uppercase transition-colors [writing-mode:vertical-rl] group-hover:text-accent"
                >
                  {service.label}
                </span>
              )}
              <span className="sr-only">{service.title}</span>
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  id={`svc-body-${service.id}`}
                  className="absolute inset-x-0 bottom-0 z-10 p-10 text-ice xl:p-12 [--color-ice:#ffffff] [--color-metal:#d3d9e1] [--color-accent:#ff7a3d]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out, delay: 0.25 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                >
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="eyebrow tabular text-metal">
                      {num(i)} / {String(visibleServices.length).padStart(2, '0')}
                    </span>
                    <span className="eyebrow text-accent">{service.label}</span>
                    {!service.confirmed && <StatusBadge kind="confirm" />}
                  </div>
                  <p aria-hidden className="display mb-4 max-w-xl text-[clamp(1.6rem,2.3vw,2.3rem)] leading-[1.05]">
                    {service.title}
                  </p>
                  <Details service={service} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        )
      })}
    </div>
  )
}

/** Celular e tablet: cartões empilhados, conteúdo sempre visível. */
function Stack() {
  return (
    <div className="mt-14 space-y-14">
      {visibleServices.map((service, i) => (
        <article key={service.id} id={`svc-${service.id}`} aria-labelledby={`service-${service.id}`} className="scroll-mt-24">
          <Reveal>
            <MediaFrame
              image={service.image}
              alt={service.title}
              variant={service.visual}
              className="chamfer chamfer-lg aspect-[16/11] bg-graphite [--vehicle-bg:var(--color-graphite)]"
              sizes="100vw"
            >
              <span aria-hidden className="display absolute bottom-3 left-5 text-6xl text-accent/90">
                {num(i)}
              </span>
            </MediaFrame>
          </Reveal>
          <Reveal delay={0.05} className="mt-6">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="eyebrow text-accent">{service.label}</span>
              {!service.confirmed && <StatusBadge kind="confirm" />}
            </div>
            <h3 id={`service-${service.id}`} className="display mb-3 text-2xl leading-[1.05]">
              {service.title}
            </h3>
            <Details service={service} compact />
          </Reveal>
        </article>
      ))}
    </div>
  )
}

export function Services() {
  const desktop = useMediaQuery('(min-width: 1024px)')
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="relative pt-16 pb-24 sm:pb-32">
      <div className="container-page">
        <SectionHeading
          id="servicos-title"
          index={sectionNumber('servicos')}
          eyebrow="Soluções"
          title="Soluções para *cada operação.*"
          intro="Passe o mouse para explorar cada frente."
        />
        {desktop ? <Panels /> : <Stack />}
      </div>
    </section>
  )
}
