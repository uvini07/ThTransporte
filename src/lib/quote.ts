import type { ServiceId } from '../types/index.ts'

export type QuotePrefill = { service?: ServiceId | 'multiplos'; details?: string }

const EVENT = 'quote:prefill'

/** Pré-preenche o formulário de orçamento a partir de qualquer CTA da página. */
export function prefillQuote(detail: QuotePrefill) {
  window.dispatchEvent(new CustomEvent<QuotePrefill>(EVENT, { detail }))
}

export function onQuotePrefill(handler: (detail: QuotePrefill) => void) {
  const listener = (event: Event) => handler((event as CustomEvent<QuotePrefill>).detail)
  window.addEventListener(EVENT, listener)
  return () => window.removeEventListener(EVENT, listener)
}
