import { motion, useReducedMotion } from 'motion/react'

/** Rede de rotas decorativa: linhas que se desenham e nós com pulso discreto. */
const routes = [
  'M-20 300 C 160 300 220 140 420 150 S 700 260 860 120 S 1100 60 1260 90',
  'M-20 420 C 200 400 300 330 520 340 S 820 420 1000 300 S 1180 250 1260 260',
  'M120 520 C 260 420 340 240 600 220 S 980 120 1260 180',
]
const nodes: [number, number][] = [
  [420, 150],
  [860, 120],
  [520, 340],
  [1000, 300],
  [600, 220],
]

export function RouteField({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <svg viewBox="0 0 1240 560" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <linearGradient id="route-fade" x1="0" x2="1">
          <stop offset="0" stopColor="#f05a1a" stopOpacity="0" />
          <stop offset="0.35" stopColor="#f05a1a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#f05a1a" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {routes.map((d, i) => (
        <g key={d}>
          <path d={d} fill="none" stroke="#aab4c0" strokeOpacity="0.08" strokeWidth="1" />
          <motion.path
            d={d}
            fill="none"
            stroke="url(#route-fade)"
            strokeWidth="1.4"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, delay: 0.6 + i * 0.25, ease: [0.65, 0, 0.35, 1] }}
          />
        </g>
      ))}
      {nodes.map(([x, y], i) => (
        <motion.g
          key={`${x}-${y}`}
          initial={reduce ? false : { opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.4 + i * 0.12 }}
          style={{ transformOrigin: `${x}px ${y}px`, transformBox: 'view-box' }}
        >
          <circle cx={x} cy={y} r="10" fill="none" stroke="#f05a1a" strokeOpacity="0.35" className="origin-center animate-pulse-ring [transform-box:fill-box]" style={{ animationDelay: `${i * 0.5}s` }} />
          <circle cx={x} cy={y} r="3" fill="#f05a1a" />
        </motion.g>
      ))}
    </svg>
  )
}
