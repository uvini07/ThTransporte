import type React from "react"
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { company, heroCopy, heroMedia } from '../../data/company.ts'
import { team } from '../../data/team.ts'
import { fleetTotals, yearsOfExperience } from '../../lib/content.ts'
import { ease } from '../../lib/motion.ts'
import { RouteField } from '../illustrations/RouteField.tsx'
import { ButtonLink } from '../ui/Button.tsx'
import { Counter } from '../ui/Counter.tsx'
import { MaskText } from '../ui/MaskText.tsx'
import { StatusBadge } from '../ui/Pending.tsx'

const stats = [
  { label: 'Anos de experiência', value: yearsOfExperience },
  { label: 'Veículos na frota', value: fleetTotals.complete ? fleetTotals.total : null },
  { label: 'Profissionais na equipe', value: team.totalMembers },
  { label: 'Clientes corporativos', value: company.corporateClients },
].filter((s) => s.value !== null)

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: ease.out, delay },
})

/** Corte diagonal do painel de foto (desktop). Começa recolhido à direita e "abre" na entrada. */
const PANEL_OPEN = 'polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)'
const PANEL_CLOSED = 'polygon(100% 0%, 100% 0%, 100% 100%, 70% 100%)'

function Media({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  if (!heroMedia) return <RouteField className={`size-full ${className}`} />
  if (heroMedia.type === 'video')
    return (
      <video
        className={`size-full object-cover ${className}`}
        src={heroMedia.src}
        poster={heroMedia.poster}
        autoPlay={!reduce}
        muted
        loop
        playsInline
        aria-label={heroMedia.alt}
      />
    )
  return (
    <img
      src={heroMedia.src}
      srcSet={heroMedia.srcSet}
      sizes="(min-width: 1024px) 54vw, 100vw"
      alt={heroMedia.alt}
      fetchPriority="high"
      decoding="async"
      className={`size-full object-cover ${className}`}
    />
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const photoScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.12])
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '8%'])
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '-8%'])

  return (
    <section
      ref={ref}
      id="inicio"
      aria-labelledby="hero-title"
      style={{ "--color-ink": "#0e1a2b", "--color-ice": "#faf8f5", "--color-metal": "#a9b3c1", "--color-line": "#24344a", "--color-accent": "#ff7a3d" } as React.CSSProperties}
      className="relative isolate overflow-hidden text-ice [clip-path:polygon(0_0,100%_0,100%_calc(100%-5vw),0_100%)]"
    >
      {/* Ambiente: a própria rodovia, desfocada e escurecida, preenche toda a tela */}
      <div aria-hidden className="absolute inset-0 -z-20">
        {heroMedia?.blurSrc && <img src={heroMedia.blurSrc} alt="" className="size-full scale-110 object-cover opacity-0" />}
        <div className="absolute inset-0 bg-ink" />
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:linear-gradient(90deg,black,transparent_70%)]" />
        <div className="noise absolute inset-0 opacity-[0.07] mix-blend-overlay" />
      </div>

      {/* Painel de foto com corte diagonal (desktop) / fundo integral (mobile) */}
      <motion.div
        className="absolute inset-0 -z-10 max-lg:![clip-path:none] lg:left-auto lg:w-[54%]"
        initial={reduce ? false : { clipPath: PANEL_CLOSED }}
        animate={{ clipPath: PANEL_OPEN }}
        transition={{ duration: 1.5, ease: ease.inOut, delay: 0.15 }}
      >
        <motion.div className="absolute inset-0" style={{ scale: photoScale, y: photoY }}>
          <motion.div
            className="size-full"
            initial={reduce ? false : { scale: 1.25 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.2, ease: ease.out, delay: 0.15 }}
          >
            <Media className="opacity-40 lg:opacity-100" />
          </motion.div>
        </motion.div>
        {/* Escurecimento para leitura do texto (mobile) e transição na borda do corte (desktop) */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink lg:bg-gradient-to-r lg:from-ink/60 lg:via-transparent lg:to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/90 to-transparent" />
      </motion.div>

      {/* Fio de acento acompanhando o corte diagonal */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[54%] bg-gradient-to-b from-accent via-accent/80 to-accent/10 [clip-path:polygon(30%_0,calc(30%+3px)_0,3px_100%,0_100%)] lg:block"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      />

      {heroMedia && !heroMedia.official && (
        <motion.div {...enter(1.6)} className="absolute top-24 right-12 z-10 hidden lg:block">
          <StatusBadge kind="illustrative" label="Foto ilustrativa" />
        </motion.div>
      )}

      <motion.div
        style={{ y: contentY }}
        className="container-page relative flex min-h-[100svh] flex-col pt-28 pb-[calc(5vw+2rem)] lg:pt-32"
      >
        <motion.p {...enter(0.5)} className="eyebrow mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-metal">
          <span className="inline-flex items-center gap-2 text-accent">
            <span aria-hidden className="size-1.5 bg-accent shadow-[0_0_12px_2px_rgb(240_90_26/0.7)]" />
            {heroCopy.eyebrow}
          </span>
          {company.region && <span>· {company.region}</span>}
        </motion.p>

        <div className="lg:max-w-[60%]">
          <MaskText
            as="h1"
            id="hero-title"
            immediate
            delay={0.35}
            text={heroCopy.headline}
            className="display text-[clamp(2.1rem,4vw,3.9rem)] leading-[1.02]"
          />
          <motion.span
            aria-hidden
            className="lane mt-8 block h-[3px] w-36 origin-left animate-lane text-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: ease.out, delay: 1.1 }}
          />
          <motion.p {...enter(0.95)} className="mt-6 max-w-md text-base leading-relaxed text-ice/75 sm:text-lg">
            {heroCopy.subheadline}
          </motion.p>
          <motion.div {...enter(1.1)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#contato" className="[&]:text-[#0e1a2b]">Pedir orçamento grátis</ButtonLink>
            <ButtonLink href="#frota" variant="secondary">
              Conheça nossa frota
            </ButtonLink>
          </motion.div>
          {heroMedia && !heroMedia.official && (
            <motion.div {...enter(1.6)} className="mt-6 lg:hidden">
              <StatusBadge kind="illustrative" label="Fundo: foto ilustrativa" />
            </motion.div>
          )}
        </div>

        <div className="mt-auto pt-14">
          {stats.length > 0 && (
            <motion.dl {...enter(1.35)} className="chamfer chamfer-lg grid grid-cols-2 gap-px bg-line md:grid-cols-4 lg:max-w-[74%]">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-2 bg-ink/90 px-5 py-5 backdrop-blur-md sm:px-7">
                  <dt className="eyebrow order-2 text-metal">{stat.label}</dt>
                  <dd className="display order-1 text-3xl">{stat.value !== null && <Counter value={stat.value} />}</dd>
                </div>
              ))}
            </motion.dl>
          )}
        </div>
      </motion.div>
    </section>
  )
}
