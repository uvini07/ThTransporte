import { ArrowUpRight } from 'lucide-react'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'secondaryLight'

/*
 * O fundo chanfrado fica em uma camada interna (plate): assim o clip-path não corta
 * o contorno de foco do elemento clicável.
 */
const base =
  'group relative isolate inline-flex min-h-12 items-center justify-center gap-2.5 px-6 text-[0.95rem] font-semibold tracking-tight transition-[color,transform] duration-300 ease-out-quint active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60'

const text: Record<Variant, string> = {
  primary: 'text-ink',
  secondary: 'text-ice',
  secondaryLight: 'text-ink',
  ghost: 'px-0 text-ice hover:text-accent',
}

const plate: Record<Variant, string> = {
  primary: 'bg-accent group-hover:bg-[#5cbcf0]',
  secondary: 'bg-ice/[0.08] group-hover:bg-ice/[0.15]',
  secondaryLight: 'bg-ink/[0.07] group-hover:bg-ink/[0.13]',
  ghost: 'hidden',
}

function Content({ children, icon, variant }: { children: ReactNode; icon: boolean; variant: Variant }) {
  return (
    <>
      <span aria-hidden className={`chamfer chamfer-sm absolute inset-0 -z-10 transition-colors duration-300 ${plate[variant]}`} />
      {variant === 'primary' && (
        // Brilho que atravessa o botão no hover, como farol passando
        <span aria-hidden className="chamfer chamfer-sm absolute inset-0 -z-10 overflow-hidden">
          <span className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-[24deg] bg-white/40 opacity-0 transition-[left,opacity] duration-700 ease-out-quint group-hover:left-[120%] group-hover:opacity-100" />
        </span>
      )}
      <span className="relative inline-flex items-center gap-2.5">{children}</span>
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
    <a className={`${base} ${text[variant]} ${className}`} {...props}>
      <Content icon={icon} variant={variant}>
        {children}
      </Content>
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
    <button className={`${base} ${text[variant]} ${className}`} {...props}>
      <Content icon={icon} variant={variant}>
        {children}
      </Content>
    </button>
  )
}
