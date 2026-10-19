import type { CompanyInfo, HeroMedia } from '../types/index.ts'

/**
 * Dados institucionais. Substitua cada `null` por informação confirmada.
 * Este arquivo também alimenta o SEO estático (vite.config.ts), por isso
 * não deve importar imagens nem componentes.
 */
export const company: CompanyInfo = {
  // ATENÇÃO: números e contatos abaixo são FICTÍCIOS (pedido do cliente). Substitua pelos reais.
  name: 'TH Turismo',
  monogram: 'TH',
  logo: null,
  legalName: null,
  cnpj: null,
  slogan: 'Transporte de pessoas com conforto e pontualidade.',
  city: 'São Paulo – SP',
  region: 'São Paulo e região',
  address: null,
  foundedYear: 2012,
  phone: '(11) 4000-0000',
  whatsapp: '5511900000000',
  whatsappMessage:
    'Olá! Vim pelo site e gostaria de solicitar uma proposta de transporte corporativo para a minha empresa.',
  email: 'contato@thturismo.com.br',
  domain: null,
  corporateClients: 120,
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
  eyebrow: 'Transporte de pessoas',
  /** Trechos entre *asteriscos* recebem o destaque em itálico. */
  headline: 'Sua equipe no destino, *sempre no horário.*',
  subheadline:
    'Transporte corporativo, executivo e para eventos — com conforto e pontualidade.',
}

export const seoCopy = {
  title: `${company.name} — Transporte corporativo, executivo e para eventos`,
  description:
    'Transporte de pessoas para empresas: colaboradores, executivos e eventos. Solicite um orçamento.',
}
