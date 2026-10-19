import type { CompanyInfo, HeroMedia } from '../types/index.ts'

/**
 * Dados institucionais. Substitua cada `null` por informação confirmada.
 * Este arquivo também alimenta o SEO estático (vite.config.ts), por isso
 * não deve importar imagens nem componentes.
 */
export const company: CompanyInfo = {
  // Nome provisório, derivado do nome do repositório. Confirme a grafia oficial.
  name: 'TH Transporte',
  monogram: 'TH',
  logo: null,
  legalName: null,
  cnpj: null,
  slogan: null,
  city: null,
  region: null,
  address: null,
  foundedYear: null,
  phone: null,
  whatsapp: null,
  whatsappMessage:
    'Olá! Vim pelo site e gostaria de solicitar uma proposta de transporte corporativo para a minha empresa.',
  email: null,
  domain: null,
  corporateClients: null,
  social: {
    instagram: null,
    linkedin: null,
    facebook: null,
    youtube: null,
  },
  brandColors: null,
}

/** Foto ou vídeo oficial para o hero. Ex.: { type: 'video', src: '/media/hero.mp4', poster: '/media/hero.webp', alt: '...' } */
export const heroMedia: HeroMedia | null = null

export const heroCopy = {
  eyebrow: 'Transporte corporativo · Executivo · Logística',
  headline: 'Mobilidade inteligente para empresas que não podem parar.',
  subheadline:
    'Conectamos pessoas, operações e negócios com soluções de transporte e logística planejadas para a realidade da sua empresa.',
}

export const seoCopy = {
  title: `${company.name} — Transporte corporativo, executivo e logística para empresas`,
  description:
    'Transporte corporativo de colaboradores, transporte executivo, eventos e logística para empresas. Solicite uma proposta dimensionada para a sua operação.',
}
