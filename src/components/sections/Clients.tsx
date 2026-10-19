import { Award, Quote } from 'lucide-react'
import { clients } from '../../data/clients.ts'
import { isDemo } from '../../lib/config.ts'
import { authorizedCases, authorizedLogos, authorizedTestimonials, sectionNumber } from '../../lib/content.ts'
import { Pending } from '../ui/Pending.tsx'
import { Reveal } from '../ui/Reveal.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'

function Placeholder({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line p-6 text-center text-sm text-metal ${className}`}>
      {label}
      <Pending label="Aguardando dados autorizados" />
    </div>
  )
}

function Logos() {
  if (!authorizedLogos.length) {
    if (!isDemo) return null
    return (
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" aria-label="Espaços para logotipos de clientes">
        {Array.from({ length: 6 }, (_, i) => (
          <li key={i} className="grid aspect-[3/2] place-items-center rounded-2xl border border-dashed border-line font-mono text-xs tracking-wider text-metal/70 uppercase">
            Logo {i + 1}
          </li>
        ))}
      </ul>
    )
  }
  // Duplica a lista para o letreiro contínuo; a cópia fica oculta para leitores de tela.
  const loop = authorizedLogos.length >= 5
  return (
    <div className={`relative overflow-hidden ${loop ? '[mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]' : ''}`}>
      <ul className={`flex w-max items-center gap-6 ${loop ? 'animate-marquee hover:[animation-play-state:paused]' : 'flex-wrap'}`} aria-label="Clientes">
        {[...authorizedLogos, ...(loop ? authorizedLogos : [])].map((logo, i) => (
          <li key={`${logo.name}-${i}`} aria-hidden={i >= authorizedLogos.length || undefined} className="grid h-24 w-44 place-items-center rounded-2xl border border-line bg-graphite px-6">
            <img
              src={logo.logo}
              alt={logo.name}
              loading="lazy"
              className="max-h-10 w-auto max-w-full object-contain opacity-70 brightness-0 invert transition-[opacity,filter] duration-500 hover:opacity-100 hover:brightness-100 hover:invert-0"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Clients() {
  const segments = clients.segments
  return (
    <section id="clientes" aria-labelledby="clientes-title" className="relative border-t border-line py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="clientes-title"
          index={sectionNumber('clientes')}
          eyebrow="Clientes e credibilidade"
          title="Confiança construída operação a operação."
          intro={
            clients.relationshipHighlight ??
            'Clientes, depoimentos e certificações são publicados somente com autorização e comprovação.'
          }
        />

        <Reveal className="mt-14">
          <Logos />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {authorizedTestimonials.length > 0
            ? authorizedTestimonials.map((t, i) => (
                <Reveal key={t.author} delay={i * 0.08}>
                  <figure className="flex h-full flex-col rounded-[1.5rem] border border-line bg-graphite p-7">
                    <Quote className="size-6 text-accent" aria-hidden />
                    <blockquote className="mt-5 flex-1 text-lg leading-relaxed">“{t.quote}”</blockquote>
                    <figcaption className="mt-6 border-t border-line pt-5 text-sm">
                      <span className="block font-semibold">{t.author}</span>
                      <span className="text-metal">
                        {t.role} · {t.company}
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))
            : isDemo && (
                <Reveal className="lg:col-span-1">
                  <Placeholder label="Depoimentos reais de clientes" className="h-full min-h-48" />
                </Reveal>
              )}

          {authorizedCases.length > 0
            ? authorizedCases.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.08}>
                  <article className="flex h-full flex-col rounded-[1.5rem] border border-line bg-graphite p-7">
                    <p className="eyebrow text-accent">Estudo de caso · {c.client}</p>
                    <h3 className="mt-4 text-xl font-semibold">{c.title}</h3>
                    <p className="mt-3 flex-1 text-metal">{c.summary}</p>
                    {c.result && <p className="mt-5 border-t border-line pt-5 font-medium">{c.result}</p>}
                  </article>
                </Reveal>
              ))
            : isDemo && (
                <Reveal delay={0.08}>
                  <Placeholder label="Estudos de caso e indicadores documentados" className="h-full min-h-48" />
                </Reveal>
              )}

          {(clients.certifications.length > 0 || isDemo) && (
            <Reveal delay={0.16}>
              <div className="h-full rounded-[1.5rem] border border-line bg-graphite p-7">
                <p className="eyebrow mb-5 flex items-center gap-2 text-metal">
                  <Award className="size-4 text-accent" aria-hidden /> Certificações e licenças
                </p>
                {clients.certifications.length ? (
                  <ul className="space-y-4">
                    {clients.certifications.map((c) => (
                      <li key={c.name} className="border-b border-line pb-4 last:border-0 last:pb-0">
                        <p className="font-semibold">{c.name}</p>
                        <p className="text-sm text-metal">
                          {c.issuer}
                          {c.validUntil && ` · válida até ${c.validUntil}`}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Pending label="Somente certificações válidas" />
                )}
              </div>
            </Reveal>
          )}
        </div>

        {(segments.length > 0 || isDemo) && (
          <Reveal className="mt-14 flex flex-wrap items-center gap-3">
            <span className="eyebrow mr-2 text-metal">Segmentos atendidos</span>
            {segments.length ? (
              segments.map((s) => (
                <span key={s} className="rounded-full border border-line px-4 py-2 text-sm">
                  {s}
                </span>
              ))
            ) : (
              <Pending />
            )}
          </Reveal>
        )}
      </div>
    </section>
  )
}
