import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ease } from '../../lib/motion.ts'

type Props = {
  open: boolean
  onClose: () => void
  labelledBy: string
  children: ReactNode
  /** Classe do painel. */
  className?: string
}

const FOCUSABLE = 'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])'

/** Diálogo modal acessível: foco preso, Esc fecha, foco devolvido ao gatilho, rolagem bloqueada. */
export function Dialog({ open, onClose, labelledBy, children, className = '' }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.paddingRight = `${scrollbar}px`

    const frame = requestAnimationFrame(() => {
      const first = panelRef.current?.querySelector<HTMLElement>('[data-autofocus]') ?? panelRef.current
      first?.focus({ preventScroll: true })
    })

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (!nodes.length) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = ''
      document.documentElement.style.paddingRight = ''
      previouslyFocused?.focus({ preventScroll: true })
    }
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
          <motion.div
            className="absolute inset-0 bg-ink/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            className={`chamfer chamfer-lg relative z-10 max-h-[92svh] w-full overflow-y-auto overscroll-contain bg-graphite outline-none ${className}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: ease.out } }}
            exit={{ opacity: 0, y: 24, transition: { duration: 0.25 } }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-10 z-20 grid size-11 place-items-center bg-ink/80 text-ice backdrop-blur transition-colors hover:bg-accent hover:text-ink"
              aria-label="Fechar"
            >
              <X className="size-5" aria-hidden />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
