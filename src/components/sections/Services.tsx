import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Check } from 'lucide-react'
import { useRef } from 'react'
import { isDemo } from '../../lib/config.ts'
import { visibleServices, sectionNumber } from '../../lib/content.ts'
import { ease, viewportOnce } from '../../lib/motion.ts'
import { prefillQuote } from '../../lib/quote.ts'
import type { Service } from '../../types/index.ts'
import { MediaFrame } from '../illustrations/MediaFrame.tsx'
import { ButtonLink } from '../ui/Button.tsx'
import { Pending, StatusBadge } from '../ui/Pending.tsx'
import { Reveal } from '../ui/Reveal.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'

function ServiceRow({ service, index, total }: { service: Service; index: number; total: number }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-7%', '7%'])
  const reversed = index % 2 === 1
  const number = String(index + 1).padStart(2, '0')

  return (
    <article ref={ref} aria-labelledby={`service-${service.id}`} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <motion.div
        className={`group lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}
        initial={{ opacity: 0, clipPath: 'inset(12% 8% 12% 8% round 28px)' }}
        whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
        viewport={viewportOnce}
        transition={{ duration: 1.1, ease: ease.out }}
      >
        <MediaFrame
          image={service.image}
          alt={service.imageAlt}
          variant={service.visual}
          className="aspect-[4/3] rounded-[1.75rem] border border-line bg-graphite [--vehicle-bg:var(--color-graphite)] sm:aspect-[16/10]"
          innerClassName="transition-[transform,filter] duration-700 ease-out-quint group-hover:scale-[1.04] group-hover:contrast-[1.12] group-hover:brightness-110"
        >
          <motion.div aria-hidden style={{ y }} className="pointer-events-none absolute -inset-[8%] bg-[radial-gradient(40%_40%_at_70%_30%,rgb(54_169_232/0.12),transparent)]" />
          <span aria-hidden className="absolute right-5 bottom-4 font-mono text-[clamp(3rem,7vw,6rem)] leading-none font-semibold text-ice/[0.06]">
            {number}
          </span>
        </MediaFrame>
      </motion.div>

      <div className={`lg:col-span-5 ${reversed ? 'lg:order-1' : ''}`}>
        <Reveal className="mb-5 flex flex-wrap items-center gap-3">
          <span className="eyebrow tabular text-metal">
            {number} / {String(total).padStart(2, '0')}
          </span>
          <span className="eyebrow text-accent">{service.label}</span>
          {!service.confirmed && <StatusBadge kind="confirm" />}
        </Reveal>
        <Reveal delay={0.05}>
          <h3 id={`service-${service.id}`} className="text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.08] font-semibold tracking-[-0.03em]">
            {service.title}
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-5 text-lg leading-relaxed text-metal">{service.description}</p>
        </Reveal>
        <Reveal delay={0.15}>
          <ul className="mt-7 space-y-3 border-t border-line pt-6">
            {service.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-ice/90">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <Check className="size-3" aria-hidden strokeWidth={2.5} />
                </span>
                {h}
              </li>
            ))}
            {isDemo &&
              service.pendingDetails.map((d) => (
                <li key={d} className="flex flex-wrap items-center gap-3 text-metal">
                  <span className="size-5 shrink-0" aria-hidden />
                  {d}
                  <Pending />
                </li>
              ))}
          </ul>
        </Reveal>
        <Reveal delay={0.2} className="mt-8">
          <ButtonLink href="#contato" variant="secondary" onClick={() => prefillQuote({ service: service.id })}>
            Solicitar orçamento
          </ButtonLink>
        </Reveal>
      </div>
    </article>
  )
}

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="servicos-title"
          index={sectionNumber('servicos')}
          eyebrow="Soluções"
          title="Uma operação para cada forma de mover a sua empresa."
          intro="Do deslocamento diário de equipes à logística de cargas, cada frente é planejada com o mesmo rigor: entender a operação antes de colocar o primeiro veículo na rua."
        />
        <nav aria-label="Serviços" className="mt-12 flex flex-wrap gap-2">
          {visibleServices.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <a
                href={`#svc-${s.id}`}
                className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm text-metal transition-colors hover:border-accent/60 hover:text-ice"
              >
                {s.title}
              </a>
            </Reveal>
          ))}
        </nav>
        <div className="mt-20 space-y-28 sm:space-y-36">
          {visibleServices.map((service, i) => (
            <div key={service.id} id={`svc-${service.id}`} className="scroll-mt-28">
              <ServiceRow service={service} index={i} total={visibleServices.length} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
