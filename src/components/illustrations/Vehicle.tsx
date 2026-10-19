import { motion, useReducedMotion } from 'motion/react'
import { useId } from 'react'
import type { VisualVariant } from '../../types/index.ts'

/**
 * Ilustrações técnicas (perfil lateral) das categorias de veículos.
 * São representações genéricas e sempre acompanhadas do selo "Imagem ilustrativa";
 * não substituem fotografias reais da frota.
 */

type Shape = {
  body: string
  windows: string[]
  details: string[]
  wheels: number[]
  wheelR: number
  /** Linha de faixa de destaque (cor de acento). */
  stripe: string
  /** Comprimento aproximado para a cota técnica (px no viewBox). */
  span: [number, number]
  lights: string[]
}

const W = 480
const CY = 154

const shapes: Record<VisualVariant, Shape> = {
  sedan: {
    body: 'M36 156 L36 136 C36 126 42 120 54 118 L122 110 C142 92 168 77 202 72 L288 70 C316 70 336 80 356 98 L378 112 L420 118 C436 120 444 128 444 140 L444 156 Z',
    windows: ['M138 110 C154 95 174 85 200 82 L240 81 L240 110 Z', 'M250 81 L287 80 C307 80 323 88 338 101 L344 110 L250 110 Z'],
    details: ['M245 113 L245 150', 'M150 113 L150 148'],
    wheels: [122, 362],
    wheelR: 22,
    stripe: 'M50 132 L432 134',
    span: [36, 444],
    lights: ['M428 124 L442 126 L442 132 L430 131 Z'],
  },
  suv: {
    body: 'M34 156 L34 118 C34 108 40 102 52 100 L108 96 L144 62 C150 56 158 54 168 54 L330 54 C342 54 350 58 356 66 L388 96 L428 102 C440 104 446 112 446 124 L446 156 Z',
    windows: ['M124 96 L156 66 L236 66 L236 96 Z', 'M246 66 L325 66 C333 66 339 70 343 76 L364 96 L246 96 Z'],
    details: ['M241 100 L241 150', 'M136 100 L136 148'],
    wheels: [120, 362],
    wheelR: 24,
    stripe: 'M46 128 L436 130',
    span: [34, 446],
    lights: ['M432 112 L446 114 L446 122 L434 121 Z'],
  },
  van: {
    body: 'M30 156 L30 60 C30 48 38 42 50 42 L356 42 C368 42 377 47 383 56 L418 104 L436 110 C445 113 450 120 450 130 L450 156 Z',
    windows: [
      'M50 56 L102 56 L102 94 L50 94 Z',
      'M110 56 L162 56 L162 94 L110 94 Z',
      'M170 56 L222 56 L222 94 L170 94 Z',
      'M230 56 L282 56 L282 94 L230 94 Z',
      'M292 56 L350 56 C356 56 360 58 364 64 L388 96 L292 96 Z',
    ],
    details: ['M287 100 L287 150', 'M226 100 L226 150'],
    wheels: [112, 370],
    wheelR: 23,
    stripe: 'M30 120 L450 120',
    span: [30, 450],
    lights: ['M436 116 L450 118 L450 126 L438 125 Z'],
  },
  vanExecutiva: {
    body: 'M30 156 L30 58 C30 46 38 40 50 40 L356 40 C368 40 377 45 383 54 L418 104 L436 110 C445 113 450 120 450 130 L450 156 Z',
    windows: ['M48 56 C48 54 50 54 52 54 L280 54 L280 94 L52 94 C50 94 48 93 48 91 Z', 'M292 54 L350 54 C356 54 360 56 364 62 L388 96 L292 96 Z'],
    details: ['M287 100 L287 150', 'M164 98 L164 150'],
    wheels: [112, 370],
    wheelR: 23,
    stripe: 'M30 112 L450 112',
    span: [30, 450],
    lights: ['M436 116 L450 118 L450 126 L438 125 Z'],
  },
  microOnibus: {
    body: 'M24 156 L24 44 C24 36 30 32 38 32 L408 32 C422 32 431 38 435 50 L452 120 C454 127 456 133 456 140 L456 156 Z',
    windows: [
      'M44 48 L94 48 L94 96 L44 96 Z',
      'M102 48 L152 48 L152 96 L102 96 Z',
      'M160 48 L210 48 L210 96 L160 96 Z',
      'M218 48 L268 48 L268 96 L218 96 Z',
      'M276 48 L326 48 L326 96 L276 96 Z',
      'M394 48 L420 48 C426 48 430 52 431 58 L440 100 L394 100 Z',
    ],
    details: ['M340 48 L384 48 L384 150 L340 150 Z'],
    wheels: [102, 410],
    wheelR: 24,
    stripe: 'M24 116 L456 116',
    span: [24, 456],
    lights: ['M444 124 L456 126 L456 134 L446 133 Z'],
  },
  onibus: {
    body: 'M14 156 L14 36 C14 28 20 24 28 24 L446 24 C458 24 466 32 466 44 L466 156 Z',
    windows: [
      'M30 40 L82 40 L82 94 L30 94 Z',
      'M88 40 L140 40 L140 94 L88 94 Z',
      'M146 40 L198 40 L198 94 L146 94 Z',
      'M204 40 L256 40 L256 94 L204 94 Z',
      'M262 40 L314 40 L314 94 L262 94 Z',
      'M320 40 L372 40 L372 94 L320 94 Z',
      'M432 40 L456 40 C459 40 460 42 460 45 L460 104 L432 104 Z',
    ],
    details: ['M384 40 L422 40 L422 150 L384 150 Z', 'M14 112 L466 112'],
    wheels: [92, 340],
    wheelR: 25,
    stripe: 'M14 122 L466 122',
    span: [14, 466],
    lights: ['M454 128 L466 128 L466 138 L456 138 Z'],
  },
  utilitario: {
    body: 'M40 156 L40 70 C40 62 46 58 54 58 L292 58 C302 58 308 62 314 70 L356 110 L420 118 C434 120 440 128 440 140 L440 156 Z',
    windows: ['M296 70 C301 70 304 72 308 76 L342 108 L296 108 Z'],
    details: ['M288 64 L288 150', 'M60 68 L276 68 L276 142 L60 142 Z'],
    wheels: [118, 368],
    wheelR: 22,
    stripe: 'M40 124 L440 126',
    span: [40, 440],
    lights: ['M426 126 L440 128 L440 134 L428 133 Z'],
  },
  caminhao: {
    body: 'M16 146 L16 40 C16 34 20 30 26 30 L316 30 L316 146 Z M326 156 L326 62 C326 54 332 50 340 50 L404 50 C414 50 420 54 424 62 L452 112 C458 118 462 126 462 136 L462 156 Z',
    windows: ['M346 62 L403 62 C409 62 413 64 415 70 L436 108 L346 108 Z'],
    details: ['M16 146 L326 146', 'M90 30 L90 146', 'M166 30 L166 146', 'M242 30 L242 146', 'M392 112 L392 150'],
    wheels: [72, 132, 398],
    wheelR: 22,
    stripe: 'M326 124 L462 124',
    span: [16, 462],
    lights: ['M450 126 L462 128 L462 136 L452 135 Z'],
  },
}

type Props = {
  variant: VisualVariant
  className?: string
  /** Mostra cota técnica e linha de solo. */
  annotated?: boolean
  /** Desenha o contorno ao entrar na tela. */
  draw?: boolean
  title?: string
}

export function Vehicle({ variant, className = '', annotated = true, draw = true, title }: Props) {
  const s = shapes[variant]
  const uid = useId().replace(/:/g, '')
  const reduce = useReducedMotion()
  const animateDraw = draw && !reduce

  const pathAnim = animateDraw
    ? {
        initial: { pathLength: 0, opacity: 0 },
        whileInView: { pathLength: 1, opacity: 1 },
        viewport: { once: true, margin: '0px 0px -10% 0px' },
        transition: { duration: 1.6, ease: [0.65, 0, 0.35, 1] as const },
      }
    : {}
  const fadeAnim = animateDraw
    ? {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, margin: '0px 0px -10% 0px' },
        transition: { duration: 0.8, delay: 0.9 },
      }
    : {}

  return (
    <svg viewBox={`0 0 ${W} 200`} className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <defs>
        <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--vehicle-body-top, #22324a)" />
          <stop offset="1" stopColor="var(--vehicle-body-bottom, #0e1a2b)" />
        </linearGradient>
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f05a1a" stopOpacity="0.35" />
          <stop offset="0.55" stopColor="#0b1118" stopOpacity="0.85" />
          <stop offset="1" stopColor="#f05a1a" stopOpacity="0.18" />
        </linearGradient>
        <radialGradient id={`shadow-${uid}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.55" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx={(s.span[0] + s.span[1]) / 2} cy={CY + 24} rx={(s.span[1] - s.span[0]) / 1.8} ry="9" fill={`url(#shadow-${uid})`} />

      <motion.path d={s.body} fill={`url(#body-${uid})`} {...fadeAnim} />
      <motion.path d={s.body} fill="none" stroke="var(--vehicle-line, #aab4c0)" strokeWidth="1.4" strokeLinejoin="round" {...pathAnim} />

      <motion.g {...fadeAnim}>
        {s.windows.map((d) => (
          <path key={d} d={d} fill={`url(#glass-${uid})`} stroke="var(--vehicle-line, #aab4c0)" strokeOpacity="0.55" strokeWidth="1" />
        ))}
        {s.details.map((d) => (
          <path key={d} d={d} fill="none" stroke="var(--vehicle-line, #aab4c0)" strokeOpacity="0.35" strokeWidth="1" />
        ))}
        {s.lights.map((d) => (
          <path key={d} d={d} fill="#f05a1a" opacity="0.9" />
        ))}
      </motion.g>

      <motion.path d={s.stripe} stroke="#f05a1a" strokeWidth="2" strokeLinecap="round" {...pathAnim} />

      {s.wheels.map((cx) => (
        <g key={cx}>
          <path d={`M${cx - s.wheelR - 6} ${CY} A${s.wheelR + 6} ${s.wheelR + 6} 0 0 1 ${cx + s.wheelR + 6} ${CY}`} fill="var(--vehicle-bg, #0b1118)" />
          <path
            d={`M${cx - s.wheelR - 6} ${CY} A${s.wheelR + 6} ${s.wheelR + 6} 0 0 1 ${cx + s.wheelR + 6} ${CY}`}
            fill="none"
            stroke="var(--vehicle-line, #aab4c0)"
            strokeOpacity="0.6"
            strokeWidth="1.2"
          />
          <circle cx={cx} cy={CY} r={s.wheelR} fill="#06090d" stroke="var(--vehicle-line, #aab4c0)" strokeWidth="1.4" />
          <circle cx={cx} cy={CY} r={s.wheelR * 0.55} fill="none" stroke="var(--vehicle-line, #aab4c0)" strokeOpacity="0.7" strokeWidth="1" />
          <circle cx={cx} cy={CY} r={s.wheelR * 0.16} fill="var(--vehicle-line, #aab4c0)" />
        </g>
      ))}

      {annotated && (
        <g stroke="var(--vehicle-line, #aab4c0)" strokeOpacity="0.4" strokeWidth="1" fill="none">
          <path d={`M0 ${CY + s.wheelR + 1} L${W} ${CY + s.wheelR + 1}`} strokeDasharray="2 5" />
          <path d={`M${s.span[0]} 192 L${s.span[1]} 192 M${s.span[0]} 187 L${s.span[0]} 197 M${s.span[1]} 187 L${s.span[1]} 197`} />
        </g>
      )}
    </svg>
  )
}
