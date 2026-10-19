import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { ArrowUpRight, Check, Users, Package } from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import { fleetGroups } from '../../data/fleet.ts'
import { isDemo } from '../../lib/config.ts'
import { fleetTotals, visibleFleet, sectionNumber } from '../../lib/content.ts'
import { ease } from '../../lib/motion.ts'
import { prefillQuote } from '../../lib/quote.ts'
import type { FleetCategory, FleetGroup } from '../../types/index.ts'
import { MediaFrame } from '../illustrations/MediaFrame.tsx'
import { ButtonLink } from '../ui/Button.tsx'
import { Counter } from '../ui/Counter.tsx'
import { DataValue, Pending, StatusBadge } from '../ui/Pending.tsx'
import { Dialog } from '../ui/Dialog.tsx'
import { Reveal } from '../ui/Reveal.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'

type Filter = FleetGroup | 'todos'

const groupLabel: Record<FleetGroup, string> = { executivo: 'Executivo', passageiros: 'Passageiros', carga: 'Carga' }

function Quantity({ value, className = '' }: { value: number | null; className?: string }) {
  return (
    <DataValue value={value}>
      {(v) => (
        <span className={className}>
          <Counter value={v} /> <span className="text-[0.5em] font-medium text-metal">{v === 1 ? 'unidade' : 'unidades'}</span>
        </span>
      )}
    </DataValue>
  )
}

function FleetCard({ category, index, onOpen }: { category: FleetCategory; index: number; onOpen: () => void }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, ease: ease.out }}
      className="group relative"
    >
      {/* O chanfro fica na camada interna para não cortar o contorno de foco do botão */}
      <button type="button" onClick={onOpen} aria-haspopup="dialog" className="block w-full text-left">
        <div className="chamfer chamfer-lg relative aspect-[4/5] overflow-hidden bg-graphite transition-transform duration-500 ease-out-quint group-hover:-translate-y-1 [--vehicle-bg:var(--color-graphite)] sm:aspect-[5/6]">
          <motion.div layoutId={`fleet-media-${category.id}`} className="absolute inset-0">
            <MediaFrame
              image={category.image}
              alt={category.name}
              variant={category.visual}
              className="size-full"
              innerClassName="transition-transform duration-[1.2s] ease-out-quint group-hover:scale-[1.07]"
              badgeClassName="top-4 left-4"
            />
          </motion.div>
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#0e1a2b]/95 via-[#0e1a2b]/55 to-transparent" />
          {/* Faixa de acento que corre na base no hover */}
          <span aria-hidden className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out-quint group-hover:scale-x-100" />

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 [--color-ice:#ffffff] [--color-metal:#d3d9e1] [--color-accent:#ff7a3d] text-ice">
            <div className="flex items-center gap-3">
              <span className="eyebrow tabular text-metal">{String(index + 1).padStart(2, '0')}</span>
              <span className="eyebrow text-accent">{groupLabel[category.group]}</span>
            </div>
            <h3 className="display text-xl leading-[1.05]">{category.name}</h3>
            <div className="flex flex-wrap items-end justify-between gap-3 border-t border-white/20 pt-4">
              <Quantity value={category.quantity} className="display text-2xl" />
              <span className="flex items-center gap-2">
                {!category.confirmed && <StatusBadge kind="confirm" />}
                <span className="chamfer chamfer-sm grid size-10 place-items-center bg-ice/10 text-ice transition-colors duration-300 group-hover:bg-accent group-hover:text-ink">
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </span>
            </div>
          </div>
          <span className="sr-only">Ver detalhes de {category.name}</span>
        </div>
      </button>
    </motion.li>
  )
}

function Spec({ icon, label, value }: { icon: ReactNode; label: string; value: string | null }) {
  if (!value && !isDemo) return null
  return (
    <div className="chamfer chamfer-sm flex items-start gap-3 bg-ink/60 p-4">
      <span className="mt-0.5 text-accent">{icon}</span>
      <div>
        <p className="eyebrow mb-1.5 text-metal">{label}</p>
        {value ? <p className="font-medium">{value}</p> : <Pending />}
      </div>
    </div>
  )
}

function FleetDetail({ category, onClose }: { category: FleetCategory; onClose: () => void }) {
  const isCargo = category.group === 'carga'
  const [current, setCurrent] = useState(category.image)
  return (
    <div className="grid lg:grid-cols-[1.15fr_1fr]">
      <div className="relative bg-ink [--vehicle-bg:var(--color-ink)]">
        <motion.div layoutId={`fleet-media-${category.id}`} className="h-full">
          <MediaFrame
            image={current}
            alt={category.name}
            variant={category.visual}
            className="aspect-[16/11] w-full lg:aspect-auto lg:h-full lg:min-h-[34rem]"
            loading="eager"
            draw={false}
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
        </motion.div>
      </div>
      <div className="p-6 sm:p-10">
        <p className="eyebrow mb-3 text-accent">{groupLabel[category.group]}</p>
        <h3 id="fleet-dialog-title" className="display pr-12 text-3xl sm:text-4xl">
          {category.name}
        </h3>
        {!category.confirmed && <StatusBadge kind="confirm" className="mt-4" />}
        <p className="mt-5 leading-relaxed text-metal">{category.description}</p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <div className="chamfer chamfer-sm bg-ink/60 p-4 sm:col-span-2">
            <p className="eyebrow mb-2 text-metal">Quantidade disponível</p>
            <Quantity value={category.quantity} className="display text-4xl" />
          </div>
          {isCargo ? (
            <Spec icon={<Package className="size-4" aria-hidden />} label="Capacidade de carga" value={category.cargoCapacity} />
          ) : (
            <Spec icon={<Users className="size-4" aria-hidden />} label="Passageiros" value={category.passengerCapacity} />
          )}
          <Spec icon={<Check className="size-4" aria-hidden />} label="Disponibilidade" value={category.availability} />
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <h4 className="eyebrow mb-3 text-metal">Características</h4>
            <ul className="space-y-2">
              {category.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="eyebrow mb-3 text-metal">Aplicações recomendadas</h4>
            <ul className="flex flex-wrap gap-2">
              {category.applications.map((a) => (
                <li key={a} className="chamfer chamfer-sm bg-ice/[0.07] px-3 py-1.5 text-sm text-ice/90">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {category.gallery.length > 0 ? (
          <div className="mt-8">
            <h4 className="eyebrow mb-3 text-metal">Galeria</h4>
            <ul className="grid grid-cols-3 gap-2">
              {category.gallery.map((g) => (
                <li key={g.src}>
                  <button
                    type="button"
                    onClick={() => setCurrent(g)}
                    aria-pressed={current?.src === g.src}
                    className={`chamfer chamfer-sm relative block w-full overflow-hidden transition-opacity ${current?.src === g.src ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}
                  >
                    {current?.src === g.src && <span aria-hidden className="absolute inset-x-0 bottom-0 z-10 h-1 bg-accent" />}
                    <img src={g.src} srcSet={g.srcSet} sizes="160px" alt={g.alt} loading="lazy" style={{ objectPosition: g.position }} className="aspect-[4/3] w-full object-cover" />
                  </button>
                </li>
              ))}
            </ul>
            {category.gallery.some((g) => !g.official) && <p className="mt-2 text-xs text-metal">Fotos ilustrativas — não representam necessariamente a frota própria.</p>}
          </div>
        ) : (
          isDemo && (
            <p className="mt-8 flex flex-wrap items-center gap-2 text-sm text-metal">
              Galeria de fotos oficiais <Pending />
            </p>
          )
        )}

        <ButtonLink
          href="#contato"
          className="mt-10 w-full sm:w-auto"
          onClick={() => {
            prefillQuote({ details: `Tenho interesse na categoria: ${category.name}.` })
            onClose()
          }}
        >
          Solicitar proposta com esta categoria
        </ButtonLink>
      </div>
    </div>
  )
}

export function Fleet() {
  const [filter, setFilter] = useState<Filter>('todos')
  const [openId, setOpenId] = useState<string | null>(null)

  const groups = fleetGroups.filter((g) => g.id === 'todos' || visibleFleet.some((c) => c.group === g.id))
  const items = useMemo(() => visibleFleet.filter((c) => filter === 'todos' || c.group === filter), [filter])
  const opened = visibleFleet.find((c) => c.id === openId) ?? null

  return (
    <section id="frota" aria-labelledby="frota-title" className="relative overflow-hidden border-t border-line bg-graphite/40 py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute top-0 right-0 h-[40rem] w-[40rem] translate-x-1/3 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgb(240_90_26/0.1),transparent)]" />
      <div className="container-page relative">
        <SectionHeading
          id="frota-title"
          index={sectionNumber('frota')}
          eyebrow="Nossa frota"
          title="Nossa *frota.*"
          aside={
            <div className="chamfer chamfer-lg mt-8 bg-ink/70 p-6 lg:mt-0">
              <p className="eyebrow mb-3 text-metal">Total de veículos</p>
              {fleetTotals.total !== null ? (
                <p className="display text-4xl text-ice">
                  <Counter value={fleetTotals.total} />
                </p>
              ) : (
                isDemo && <Pending />
              )}
              <p className="mt-3 text-sm text-metal">
                {fleetTotals.complete
                  ? 'Soma das categorias cadastradas, sem duplicidade.'
                  : `Calculado automaticamente a partir das categorias. ${fleetTotals.pendingCategories} categoria(s) sem quantidade informada.`}
              </p>
            </div>
          }
        />

        <LayoutGroup>
          <div role="group" aria-label="Filtrar frota por categoria" className="mt-14 flex flex-wrap gap-2">
            {groups.map((g) => {
              const count = g.id === 'todos' ? visibleFleet.length : visibleFleet.filter((c) => c.group === g.id).length
              const selected = filter === g.id
              return (
                <button
                  key={g.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFilter(g.id)}
                  className={`relative inline-flex min-h-11 items-center gap-2 px-5 text-sm font-medium transition-colors duration-300 ${
                    selected ? 'text-ink' : 'text-metal hover:text-ice'
                  }`}
                >
                  {selected &&  <motion.span layoutId="fleet-filter" className="chamfer chamfer-sm absolute inset-0 -z-0 bg-accent" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                  {!selected && <span className="chamfer chamfer-sm absolute inset-0 bg-ice/[0.06]" aria-hidden />}
                  <span className="relative">{g.label}</span>
                  <span className={`relative font-mono text-xs ${selected ? 'text-ink/70' : 'text-metal/70'}`}>{count}</span>
                </button>
              )
            })}
          </div>

          <p className="sr-only" aria-live="polite">
            {items.length} categorias exibidas
          </p>

          <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {items.map((category) => (
                <FleetCard key={category.id} category={category} index={visibleFleet.indexOf(category)} onOpen={() => setOpenId(category.id)} />
              ))}
            </AnimatePresence>
          </motion.ul>

          <Dialog open={opened !== null} onClose={() => setOpenId(null)} labelledBy="fleet-dialog-title" className="max-w-6xl">
            {opened && <FleetDetail category={opened} onClose={() => setOpenId(null)} />}
          </Dialog>
        </LayoutGroup>

        <Reveal className="mt-12 max-w-2xl text-sm text-metal">
          Imagens identificadas como ilustrativas representam a categoria do veículo e não necessariamente a frota própria. Fotografias oficiais
          substituem as ilustrações assim que cadastradas.
        </Reveal>
      </div>
    </section>
  )
}
