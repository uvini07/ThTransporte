import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { company, heroCopy, heroMedia } from '../../data/company.ts'
import { team } from '../../data/team.ts'
import { isDemo } from '../../lib/config.ts'
import { fleetTotals, yearsOfExperience } from '../../lib/content.ts'
import { ease } from '../../lib/motion.ts'
import { RouteField } from '../illustrations/RouteField.tsx'
import { Vehicle } from '../illustrations/Vehicle.tsx'
import { ButtonLink } from '../ui/Button.tsx'
import { Counter } from '../ui/Counter.tsx'
import { Pending, StatusBadge } from '../ui/Pending.tsx'
import { MaskText } from '../ui/MaskText.tsx'

const stats = [
  { label: 'Anos de experiência', value: yearsOfExperience },
  { label: 'Veículos na frota', value: fleetTotals.complete ? fleetTotals.total : null },
  { label: 'Profissionais na equipe', value: team.totalMembers },
  { label: 'Clientes corporativos', value: company.corporateClients },
].filter((s) => isDemo || s.value !== null)

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: ease.out, delay },
})

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Parallax apenas dentro do palco, para não deslocar o layout nem os indicadores.
  const fieldY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '18%'])
  const vehicleX = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '14%'])

  return (
    <section ref={ref} id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-[4.5rem]">
      {/* Iluminação ambiente */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[42rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(54_169_232/0.16),transparent)]" />
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(80%_60%_at_50%_30%,black,transparent)]" />
        <div className="noise absolute inset-0 opacity-[0.06] mix-blend-overlay" />
      </div>

      <div className="container-page flex min-h-[calc(100svh-4.5rem)] flex-col pt-10 pb-8 sm:pt-14 lg:pt-16">
        <motion.p {...enter(0.25)} className="eyebrow mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-metal">
          <span className="inline-flex items-center gap-2 text-accent">
            <span aria-hidden className="size-1.5 rounded-full bg-accent shadow-[0_0_12px_2px_rgb(54_169_232/0.7)]" />
            {heroCopy.eyebrow}
          </span>
          {company.region ? <span>· {company.region}</span> : isDemo && <Pending label="Região a informar" />}
        </motion.p>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <MaskText
            as="h1"
            id="hero-title"
            immediate
            delay={0.2}
            text={heroCopy.headline}
            className="text-[clamp(2.5rem,5.6vw,5.25rem)] leading-[0.96] font-semibold tracking-[-0.045em] lg:col-span-8"
          />
          <div className="lg:col-span-4 lg:pb-2">
            <motion.p {...enter(0.9)} className="max-w-xl text-lg leading-relaxed text-metal">
              {heroCopy.subheadline}
            </motion.p>
            <motion.div {...enter(1.05)} className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col [&>a]:whitespace-nowrap">
              <ButtonLink href="#contato">Solicitar proposta corporativa</ButtonLink>
              <ButtonLink href="#frota" variant="secondary">
                Conheça nossa frota
              </ButtonLink>
            </motion.div>
          </div>
        </div>

        {/* Palco visual */}
        <motion.div
          className="relative mt-10 flex flex-1 flex-col lg:mt-12"
          initial={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, ease: ease.out, delay: 0.55 }}
        >
          <div className="relative min-h-[14rem] flex-1 overflow-hidden rounded-[1.75rem] border border-line bg-graphite [--vehicle-bg:var(--color-graphite)] sm:min-h-[19rem]">
            {heroMedia ? (
              heroMedia.type === 'video' ? (
                <video
                  className="absolute inset-0 size-full object-cover"
                  src={heroMedia.src}
                  poster={heroMedia.poster}
                  autoPlay={!reduce}
                  muted
                  loop
                  playsInline
                  aria-label={heroMedia.alt}
                />
              ) : (
                <img src={heroMedia.src} alt={heroMedia.alt} className="absolute inset-0 size-full object-cover" fetchPriority="high" />
              )
            ) : (
              <>
                <motion.div style={{ y: fieldY }} className="absolute inset-0">
                  <RouteField className="size-full" />
                </motion.div>
                {/* Faixas de luz que sugerem movimento */}
                <div aria-hidden className="absolute inset-x-0 top-[58%] h-px overflow-hidden">
                  <span className="block h-px w-1/4 animate-streak bg-gradient-to-r from-transparent via-accent to-transparent" />
                </div>
                <div aria-hidden className="absolute inset-x-0 top-[74%] h-px overflow-hidden">
                  <span className="block h-px w-1/5 animate-streak bg-gradient-to-r from-transparent via-ice/60 to-transparent [animation-delay:1.4s] [animation-duration:4.4s]" />
                </div>
                <motion.div style={{ x: vehicleX }} className="absolute inset-x-0 bottom-[6%] mx-auto w-[min(92%,44rem)]">
                  <motion.div
                    initial={{ opacity: 0, x: '-6%' }}
                    animate={{ opacity: 1, x: '0%' }}
                    transition={{ duration: 1.6, ease: ease.out, delay: 0.8 }}
                  >
                    <Vehicle variant="vanExecutiva" className="w-full" title="Van executiva — ilustração" />
                  </motion.div>
                </motion.div>
                <StatusBadge kind="illustrative" className="absolute top-4 left-4" />
              </>
            )}
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent" />
          </div>

          {stats.length > 0 && (
            <dl className="relative -mt-px grid grid-cols-2 overflow-hidden rounded-b-[1.75rem] border border-t-0 border-line bg-ink/60 backdrop-blur md:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className={`flex flex-col gap-2 px-5 py-5 sm:px-7 ${i % 2 ? 'border-l border-line' : ''} ${i > 1 ? 'border-t border-line md:border-t-0' : ''} ${i === 2 ? 'md:border-l' : ''}`}
                  {...enter(1.2 + i * 0.08)}
                >
                  <dt className="eyebrow order-2 text-metal">{stat.label}</dt>
                  <dd className="order-1 text-3xl font-semibold tracking-tight sm:text-4xl">
                    {stat.value !== null ? <Counter value={stat.value} /> : <Pending />}
                  </dd>
                </motion.div>
              ))}
            </dl>
          )}
        </motion.div>

        <motion.a
          href="#servicos"
          {...enter(1.5)}
          className="group mx-auto mt-6 hidden flex-col items-center gap-2 text-metal transition-colors hover:text-ice sm:flex"
        >
          <span className="eyebrow">Role para explorar</span>
          <span aria-hidden className="relative h-9 w-px overflow-hidden bg-line">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-accent" />
          </span>
        </motion.a>
      </div>
    </section>
  )
}
