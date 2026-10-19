import { z } from 'zod'
import { frequencyOptions } from '../data/content.ts'

const phoneDigits = (v: string) => v.replace(/\D/g, '')

export const quoteSchema = z.object({
  name: z.string().trim().min(3, 'Informe seu nome completo.').max(120),
  company: z.string().trim().min(2, 'Informe o nome da empresa.').max(160),
  role: z.string().trim().max(120).optional().or(z.literal('')),
  email: z.string().trim().min(1, 'Informe seu e-mail corporativo.').pipe(z.email('Informe um e-mail válido, como nome@empresa.com.br.')),
  phone: z
    .string()
    .trim()
    .refine((v) => phoneDigits(v).length >= 10 && phoneDigits(v).length <= 13, 'Informe um telefone com DDD, como (11) 91234-5678.'),
  service: z.string().min(1, 'Selecione o tipo de serviço.'),
  volume: z.string().trim().min(1, 'Informe uma estimativa, como “3 vans” ou “40 passageiros”.').max(160),
  region: z.string().trim().min(2, 'Informe a cidade ou região de atendimento.').max(160),
  frequency: z.enum(frequencyOptions, { error: 'Selecione a frequência da operação.' }),
  message: z.string().trim().min(20, 'Descreva a necessidade com pelo menos 20 caracteres.').max(3000, 'Use no máximo 3.000 caracteres.'),
  consent: z.literal(true, { error: 'É necessário autorizar o uso dos dados para receber a proposta.' }),
  /** Campo-isca contra robôs; deve permanecer vazio. */
  website: z.string().max(0).optional(),
})

export type QuoteInput = z.input<typeof quoteSchema>
export type QuoteData = z.output<typeof quoteSchema>

/** Mascara progressiva de telefone brasileiro: (11) 91234-5678 */
export function maskPhone(value: string) {
  const d = phoneDigits(value).slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}
