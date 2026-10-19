import { company } from '../data/company.ts'

const digits = (value: string) => value.replace(/\D/g, '')

/** Link do WhatsApp com mensagem pré-preenchida, ou null se o número não estiver configurado. */
export function whatsappLink(message: string = company.whatsappMessage): string | null {
  if (!company.whatsapp) return null
  const number = digits(company.whatsapp)
  if (number.length < 10) return null
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export function phoneLink(): string | null {
  if (!company.phone) return null
  const number = digits(company.phone)
  return number.length >= 8 ? `tel:+${number.startsWith('55') ? number : `55${number}`}` : null
}

export function mailLink(subject?: string, body?: string): string | null {
  if (!company.email) return null
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const query = params.toString().replace(/\+/g, '%20')
  return `mailto:${company.email}${query ? `?${query}` : ''}`
}

export const hasAnyContactChannel = () => Boolean(whatsappLink() || phoneLink() || mailLink())
