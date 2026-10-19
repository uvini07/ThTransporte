import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useActiveSection } from '../../hooks/useActiveSection.ts'
import { navItems } from '../../lib/content.ts'
import { ease } from '../../lib/motion.ts'
import { BrandLogo } from '../ui/BrandLogo.tsx'
import { ButtonLink } from '../ui/Button.tsx'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(navItems.map((n) => n.id))
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    // Esconde ao rolar para baixo e reaparece ao subir, sem esconder no topo nem com o menu aberto.
    setHidden(y > 640 && y > prev + 4 && !menuOpen)
    if (y < prev - 4) setHidden(false)
  })

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      animate={{ y: hidden ? '-110%' : '0%' }}
      transition={{ duration: 0.45, ease: ease.out }}
    >
      <div
        className={`transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || menuOpen ? 'border-b border-line/80 bg-ink/80 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
          <motion.a
            href="#inicio"
            className="relative z-10 -m-2 rounded-xl p-2"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: ease.out, delay: 0.1 }}
            onClick={() => setMenuOpen(false)}
          >
            <BrandLogo />
          </motion.a>

          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: ease.out, delay: 0.2 + i * 0.04 }}
                >
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`relative block rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
                      active === item.id ? 'text-ice' : 'text-metal hover:text-ice'
                    }`}
                  >
                    {active === item.id && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full border border-line bg-graphite-2"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block">
              <ButtonLink href="#contato" className="min-h-10 px-5 text-sm whitespace-nowrap">
                Solicitar proposta
              </ButtonLink>
            </span>
            <button
              type="button"
              className="relative z-10 grid size-11 place-items-center rounded-full border border-line text-ice transition-colors hover:border-metal xl:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {menuOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
        <motion.div aria-hidden className="h-px origin-left bg-accent" style={{ scaleX: progress }} />
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Menu móvel"
            className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto bg-ink/95 backdrop-blur-xl xl:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.6, ease: ease.out } }}
            exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.4, ease: ease.inOut } }}
          >
            <ul className="container-page flex flex-col py-8">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  className="border-b border-line"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.12 + i * 0.05, duration: 0.5, ease: ease.out } }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active === item.id ? 'true' : undefined}
                    className="flex items-center justify-between py-5 text-2xl font-semibold tracking-tight"
                  >
                    {item.label}
                    <span className={`eyebrow ${active === item.id ? 'text-accent' : 'text-metal'}`}>0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="container-page pb-10">
              <ButtonLink href="#contato" className="w-full" onClick={() => setMenuOpen(false)}>
                Solicitar proposta corporativa
              </ButtonLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
