import { ClipboardList } from 'lucide-react'
import { useMemo, useState } from 'react'
import { isDemo } from '../../lib/config.ts'
import { pendingItems } from '../../lib/content.ts'
import { Dialog } from '../ui/Dialog.tsx'

/** Selo fixo do modo demonstração com a lista automática de dados pendentes. */
export function DemoPanel() {
  const [open, setOpen] = useState(false)
  const groups = useMemo(() => pendingItems(), [])
  const total = groups.reduce((n, g) => n + g.items.length, 0)
  if (!isDemo) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="fixed bottom-4 left-4 z-40 inline-flex min-h-11 items-center gap-2 rounded-full border border-warn/40 bg-ink/85 px-4 text-xs font-medium text-warn shadow-lg backdrop-blur-md transition-colors hover:border-warn hover:bg-ink"
      >
        <span className="relative flex size-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-warn opacity-60" />
          <span className="relative size-2 rounded-full bg-warn" />
        </span>
        <span className="sm:hidden">Demo · {total} pendências</span>
        <span className="hidden sm:inline">Modo demonstração · {total} pendências</span>
      </button>
      <Dialog open={open} onClose={() => setOpen(false)} labelledBy="demo-title" className="max-w-2xl">
        <div className="p-6 sm:p-10">
          <p className="eyebrow mb-3 flex items-center gap-2 text-warn">
            <ClipboardList className="size-4" aria-hidden /> Modo demonstração
          </p>
          <h2 id="demo-title" className="pr-12 text-2xl font-semibold tracking-tight sm:text-3xl">
            Informações a confirmar antes da publicação
          </h2>
          <p className="mt-4 text-metal">
            Esta versão exibe marcadores “A informar” e “A confirmar” no lugar de dados reais. Preencha os arquivos em <code className="font-mono text-ice">src/data</code> e
            publique com <code className="font-mono text-ice">VITE_DEMO_MODE=false</code> para ocultar o que não foi confirmado.
          </p>
          <div className="mt-8 space-y-7">
            {groups.map((g) => (
              <section key={g.group}>
                <h3 className="eyebrow mb-3 text-metal">
                  {g.group} <span className="text-warn">({g.items.length})</span>
                </h3>
                <ul className="grid gap-1.5 text-sm sm:grid-cols-2">
                  {g.items.map((item) => (
                    <li key={item} className="flex gap-2 text-ice/85">
                      <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-warn" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </Dialog>
    </>
  )
}
