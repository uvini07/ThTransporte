import { useCallback, useEffect, useState } from 'react'

/**
 * Abre um painel quando a URL contém o hash informado (ex.: #politica-de-privacidade),
 * permitindo links diretos e fechamento pelo botão Voltar do navegador.
 */
export function useHashFlag(hash: string) {
  const [open, setOpen] = useState(() => typeof window !== 'undefined' && window.location.hash === `#${hash}`)

  useEffect(() => {
    const sync = () => setOpen(window.location.hash === `#${hash}`)
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [hash])

  const close = useCallback(() => {
    if (window.location.hash !== `#${hash}`) return setOpen(false)
    if (window.history.state?.hashFlag === hash) {
      window.history.back()
    } else {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
      setOpen(false)
    }
  }, [hash])

  const openFlag = useCallback(() => {
    window.history.pushState({ hashFlag: hash }, '', `#${hash}`)
    setOpen(true)
  }, [hash])

  return { open, openFlag, close }
}
