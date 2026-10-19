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

/**
 * Fundo da tela principal. Para vídeo: { type: 'video', src: '/media/hero.mp4', poster: '/media/hero.webp', alt, official }.
 * (Os caminhos ficam aqui, sem importar photos.ts, porque este arquivo também é lido no build de SEO.)
 */
export const heroMedia: HeroMedia | null = {
  type: 'image',
  src: '/media/rodovia-533.webp',
  blurSrc: '/media/rodovia-blur.webp',
  alt: 'Vista aérea de uma rodovia ao entardecer com faixas de luz dos veículos',
  official: false,
}

export const heroCopy = {
  eyebrow: 'Mobilidade corporativa',
  /** Trechos entre *asteriscos* recebem o destaque em itálico. */
  headline: 'Mobilidade inteligente para empresas que *não podem parar.*',
  subheadline:
    'Transporte corporativo, executivo e logística sob medida para a sua operação.',
}

export const seoCopy = {
  title: `${company.name} — Transporte corporativo, executivo e logística para empresas`,
  description:
    'Transporte corporativo de colaboradores, transporte executivo, eventos e logística para empresas. Solicite uma proposta dimensionada para a sua operação.',
}
