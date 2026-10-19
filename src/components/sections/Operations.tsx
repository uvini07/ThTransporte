import { motion } from 'motion/react'
import { company } from '../../data/company.ts'
import { team } from '../../data/team.ts'
import { isDemo } from '../../lib/config.ts'
import { ease, viewportOnce } from '../../lib/motion.ts'
import { sectionNumber } from '../../lib/content.ts'
import { Counter } from '../ui/Counter.tsx'
import { LightPanel } from '../ui/LightPanel.tsx'
import { Pending } from '../ui/Pending.tsx'
import { Reveal } from '../ui/Reveal.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'

const headcount = [
  { label: 'Equipe total', hint: 'Todos os colaboradores da empresa', value: team.totalMembers, primary: true },
  { label: 'Motoristas', hint: 'Profissionais habilitados', value: team.drivers },
  { label: 'Logística e operação', hint: 'Planejamento e acompanhamento', value: team.logisticsStaff },
  { label: 'Administrativo e suporte', hint: 'Atendimento e gestão de contratos', value: team.supportStaff },
].filter((h) => isDemo || h.value !== null)

const facts = [
  { label: 'Cobertura geográfica', value: team.coverage ?? company.region },
  { label: 'Capacidade de atendimento simultâneo', value: team.simultaneousCapacity },
  { label: 'Modelo de operação', value: team.operationModel && `Operação ${team.operationModel}` },
].filter((f) => isDemo || f.value)

function CapacityBar() {
  const { allocatedToContracts: allocated, availableForNewContracts: available } = team
  const hasBoth = allocated !== null && available !== null && allocated + available > 0
  if (!hasBoth && !isDemo) return null
  const pct = hasBoth ? (available / (allocated + available)) * 100 : 0

  return (
    <Reveal className="rounded-[1.5rem] border border-ink/10 bg-white p-6 sm:p-8 lg:col-span-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-2 text-accent-strong">Disponibilidade para novos contratos</p>
          <p className="max-w-xl text-slate">
            Separamos a equipe já dedicada a contratos ativos dos profissionais livres para iniciar novas operações.
          </p>
        </div>
        <dl className="flex gap-10">
          <div>
            <dt className="eyebrow text-slate">Alocados</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight">{allocated !== null ? <Counter value={allocated} /> : <Pending tone="light" />}</dd>
          </div>
          <div>
            <dt className="eyebrow text-slate">Disponíveis</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-accent-strong">
              {available !== null ? <Counter value={available} /> : <Pending tone="light" />}
            </dd>
          </div>
        </dl>
      </div>
      <div className="mt-8 h-3 overflow-hidden rounded-full bg-ice-2" role="img" aria-label={hasBoth ? `${Math.round(pct)}% da equipe disponível para novos contratos` : 'Distribuição da equipe a informar'}>
        {hasBoth ? (
          <motion.div
            className="flex h-full origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.4, ease: ease.out }}
          >
            <span className="h-full bg-ink" style={{ width: `${100 - pct}%` }} />
            <span className="h-full bg-accent" style={{ width: `${pct}%` }} />
          </motion.div>
        ) : (
          <div className="h-full w-full bg-[repeating-linear-gradient(135deg,transparent_0_8px,rgb(16_20_25/0.08)_8px_16px)]" />
        )}
      </div>
    </Reveal>
  )
}

export function Operations() {
  return (
    <LightPanel id="estrutura" labelledBy="estrutura-title">
      <div className="container-page py-24 sm:py-32">
        <SectionHeading
          id="estrutura-title"
          index={sectionNumber('estrutura')}
          eyebrow="Estrutura operacional"
          tone="light"
          title="Gente preparada por trás de cada quilômetro."
          intro="Capacidade não é só frota. É equipe dimensionada, processos claros e coordenação para manter cada contrato funcionando como combinado."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          <dl className="grid gap-5 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-2">
            {headcount.map((item, i) => (
              <Reveal
                key={item.label}
                delay={i * 0.06}
                className={`flex min-h-44 flex-col justify-between rounded-[1.5rem] p-6 sm:p-8 ${item.primary ? 'bg-ink text-ice' : 'border border-ink/10 bg-white'}`}
              >
                <dt>
                  <span className={`eyebrow ${item.primary ? 'text-accent' : 'text-accent-strong'}`}>{item.label}</span>
                  <span className={`mt-2 block text-sm ${item.primary ? 'text-metal' : 'text-slate'}`}>{item.hint}</span>
                </dt>
                <dd className="mt-6 text-[clamp(2.5rem,5vw,4rem)] leading-none font-semibold tracking-[-0.04em]">
                  {item.value !== null ? <Counter value={item.value} /> : <Pending tone={item.primary ? 'dark' : 'light'} />}
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.2} className="flex flex-col rounded-[1.5rem] border border-ink/10 bg-white p-6 sm:p-8 lg:col-span-4">
            <dl className="divide-y divide-ink/10">
              {facts.map((f) => (
                <div key={f.label} className="py-5 first:pt-0 last:pb-0">
                  <dt className="eyebrow mb-2 text-slate">{f.label}</dt>
                  <dd className="text-lg font-medium">{f.value ?? <Pending tone="light" />}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <CapacityBar />
        </div>
      </div>
    </LightPanel>
  )
}
