import { ArrowUpRight } from 'lucide-react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'secondaryLight'

const base =
  'group relative inline-flex min-h-12 items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 text-[0.95rem] font-semibold tracking-tight transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out-quint active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-ink hover:bg-[#5cbcf0] hover:shadow-[0_10px_40px_-12px_rgb(54_169_232/0.7)]',
  secondary: 'border border-ice/20 text-ice hover:border-ice/50 hover:bg-ice/5',
  secondaryLight: 'border border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/5',
  ghost: 'px-0 text-ice hover:text-accent',
}

function Content({ children, icon }: { children: ReactNode; icon: boolean }) {
  return (
    <>
      <span className="relative">{children}</span>
      {icon && (
        <span aria-hidden className="relative grid size-5 place-items-center overflow-hidden">
          <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-quint group-hover:translate-x-5 group-hover:-translate-y-5" />
          <ArrowUpRight className="absolute size-4 -translate-x-5 translate-y-5 transition-transform duration-500 ease-out-quint group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </>
  )
}

export function ButtonLink({
  variant = 'primary',
  icon = true,
  className = '',
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; icon?: boolean }) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      <Content icon={icon}>{children}</Content>
    </a>
  )
}

export function Button({
  variant = 'primary',
  icon = true,
  className = '',
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; icon?: boolean }) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      <Content icon={icon}>{children}</Content>
    </button>
  )
}
