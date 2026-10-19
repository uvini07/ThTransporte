import { motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { visibleDifferentials, sectionNumber } from '../../lib/content.ts'
import { ease, viewportOnce } from '../../lib/motion.ts'
import { Icon } from '../ui/Icon.tsx'
import { StatusBadge } from '../ui/Pending.tsx'
import { Reveal } from '../ui/Reveal.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'

const SIZE = 440
const C = SIZE / 2

function Diagram({ active }: { active: string | null }) {
  const reduce = useReducedMotion()
  const n = visibleDifferentials.length
  const radius = 168
  const points = visibleDifferentials.map((d, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2
    return { id: d.id, icon: d.icon, x: C + Math.cos(angle) * radius, y: C + Math.sin(angle) * radius }
  })

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full max-w-[28rem]" aria-hidden>
      <circle cx={C} cy={C} r={radius} fill="none" stroke="#101419" strokeOpacity="0.1" strokeDasharray="3 6" />
      <circle cx={C} cy={C} r={radius * 0.55} fill="none" stroke="#101419" strokeOpacity="0.08" />
      {points.map((p, i) => (
        <motion.line
          key={p.id}
          x1={C}
          y1={C}
          x2={p.x}
          y2={p.y}
          stroke={active === p.id ? '#0e6fa8' : '#101419'}
          strokeOpacity={active === p.id ? 0.9 : 0.16}
          strokeWidth={active === p.id ? 1.6 : 1}
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, delay: 0.2 + i * 0.06, ease: ease.out }}
        />
      ))}
      {points.map((p, i) => (
        <motion.g
          key={p.id}
          initial={reduce ? false : { opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.6 + i * 0.06, ease: ease.out }}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
        >
          <circle cx={p.x} cy={p.y} r={active === p.id ? 26 : 22} fill={active === p.id ? '#0e6fa8' : '#ffffff'} stroke="#101419" strokeOpacity="0.14" className="transition-all duration-300" />
          <foreignObject x={p.x - 10} y={p.y - 10} width="20" height="20">
            <Icon name={p.icon} className={`size-5 ${active === p.id ? 'text-white' : 'text-ink'}`} />
          </foreignObject>
        </motion.g>
      ))}
      <circle cx={C} cy={C} r="54" fill="#0b1118" />
      <circle cx={C} cy={C} r="54" fill="none" stroke="#36a9e8" strokeOpacity="0.5" />
      <text x={C} y={C - 4} textAnchor="middle" className="fill-ice font-sans text-[13px] font-semibold">
        Sua
      </text>
      <text x={C} y={C + 13} textAnchor="middle" className="fill-ice font-sans text-[13px] font-semibold">
        operação
      </text>
    </svg>
  )
}

export function Differentials() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <section id="diferenciais" aria-labelledby="diferenciais-title" className="theme-light relative bg-ice pb-[5vw] text-ink [clip-path:polygon(0_0,100%_0,100%_calc(100%-5vw),0_100%)] [color-scheme:light]">
      <div className="container-page border-t border-ink/10 py-24 sm:py-32">
        <SectionHeading
          id="diferenciais-title"
          index={sectionNumber('diferenciais')}
          eyebrow="Diferenciais e segurança"
          tone="light"
          title="Segurança em *cada etapa.*"
          intro={undefined}
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="hidden lg:sticky lg:top-28 lg:col-span-5 lg:block lg:self-start">
            <Diagram active={active} />
          </div>
          <ul className="chamfer chamfer-lg grid gap-px overflow-hidden bg-ink/10 sm:grid-cols-2 lg:col-span-7">
            {visibleDifferentials.map((d, i) => (
              <li key={d.id} className="bg-ice">
                <Reveal
                  delay={(i % 2) * 0.06}
                  className="group flex h-full flex-col gap-4 p-6 transition-colors duration-300 hover:bg-white sm:p-7"
                  onMouseEnter={() => setActive(d.id)}
                  onMouseLeave={() => setActive(null)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="chamfer chamfer-sm grid size-11 place-items-center bg-white text-accent-strong transition-colors duration-300 group-hover:border-accent-strong group-hover:bg-accent-strong group-hover:text-white">
                      <Icon name={d.icon} className="size-5" />
                    </span>
                    {!d.confirmed && <StatusBadge kind="confirm" tone="light" />}
                  </div>
                  <h3 className="text-base font-semibold tracking-tight">{d.title}</h3>
                                  </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
