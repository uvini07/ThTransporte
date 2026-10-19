import {
  Check,
  Clock,
  FileCheck2,
  Gauge,
  GraduationCap,
  Headset,
  Radar,
  Route,
  ShieldCheck,
  Shuffle,
  Wrench,
  type LucideProps,
} from 'lucide-react'

const icons = {
  route: Route,
  gauge: Gauge,
  wrench: Wrench,
  graduation: GraduationCap,
  radar: Radar,
  clock: Clock,
  shuffle: Shuffle,
  headset: Headset,
  shield: ShieldCheck,
  file: FileCheck2,
  check: Check,
}

export type IconName = keyof typeof icons

/** Ícones referenciados por nome nos arquivos de dados. */
export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Component = icons[name as IconName] ?? Check
  return <Component aria-hidden strokeWidth={1.6} {...props} />
}
