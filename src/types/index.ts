/**
 * Tipos centrais do site. Todo dado factual (números, contatos, clientes,
 * certificações) aceita `null`: enquanto não for confirmado pela empresa,
 * o site exibe "A informar" no modo demonstração e oculta o campo na
 * versão pública. Nunca preencha com valores estimados.
 */

export type Nullable<T> = T | null

export interface SocialLinks {
  instagram: Nullable<string>
  linkedin: Nullable<string>
  facebook: Nullable<string>
  youtube: Nullable<string>
}

export interface CompanyInfo {
  /** Nome comercial exibido no site. */
  name: string
  /** Sigla usada no monograma quando não há logotipo. */
  monogram: string
  /** Caminho do logotipo em /public (SVG ou PNG). Ex.: "/brand/logo.svg". */
  logo: Nullable<string>
  legalName: Nullable<string>
  cnpj: Nullable<string>
  slogan: Nullable<string>
  /** Cidade-sede. Ex.: "Campinas – SP". */
  city: Nullable<string>
  /** Região de atuação. Ex.: "Região Metropolitana de Campinas e interior de SP". */
  region: Nullable<string>
  address: Nullable<string>
  foundedYear: Nullable<number>
  /** Telefone comercial no formato exibido. Ex.: "(19) 3000-0000". */
  phone: Nullable<string>
  /** WhatsApp com DDI e DDD, apenas dígitos. Ex.: "5519999999999". */
  whatsapp: Nullable<string>
  whatsappMessage: string
  email: Nullable<string>
  /** Domínio com protocolo. Ex.: "https://www.empresa.com.br". */
  domain: Nullable<string>
  corporateClients: Nullable<number>
  social: SocialLinks
  /** Cores confirmadas da marca (informativo; os tokens ficam em styles/index.css). */
  brandColors: Nullable<string[]>
}

export interface HeroMedia {
  /** Fotografia ou vídeo oficial da frota. Quando nulo, usa a ilustração. */
  type: 'image' | 'video'
  src: string
  poster?: string
  alt: string
}

export type ServiceId = 'logistica' | 'corporativo' | 'executivo' | 'eventos' | 'personalizado'

export type VisualVariant =
  | 'sedan'
  | 'suv'
  | 'van'
  | 'vanExecutiva'
  | 'microOnibus'
  | 'onibus'
  | 'utilitario'
  | 'caminhao'

export interface Service {
  id: ServiceId
  /** Somente serviços confirmados aparecem na versão pública. */
  confirmed: boolean
  label: string
  title: string
  description: string
  highlights: string[]
  /** Informações que dependem da empresa (modalidades, abrangência etc.). */
  pendingDetails: string[]
  visual: VisualVariant
  /** Foto oficial opcional. Substitui a ilustração. */
  image: Nullable<string>
  imageAlt: string
}

export type FleetGroup = 'executivo' | 'passageiros' | 'carga'

export interface FleetCategory {
  id: string
  /** Somente categorias confirmadas aparecem na versão pública. */
  confirmed: boolean
  name: string
  group: FleetGroup
  /** Unidades próprias nesta categoria. Cada veículo deve constar em uma única categoria. */
  quantity: Nullable<number>
  passengerCapacity: Nullable<string>
  cargoCapacity: Nullable<string>
  description: string
  features: string[]
  applications: string[]
  availability: Nullable<string>
  visual: VisualVariant
  /** Foto oficial principal. Quando nula, usa a ilustração (com selo "Imagem ilustrativa"). */
  image: Nullable<string>
  imageAlt: string
  /** Fotos oficiais adicionais exibidas no painel de detalhes. */
  gallery: { src: string; alt: string }[]
}

export interface TeamData {
  totalMembers: Nullable<number>
  drivers: Nullable<number>
  logisticsStaff: Nullable<number>
  supportStaff: Nullable<number>
  /** Profissionais já alocados em contratos ativos. */
  allocatedToContracts: Nullable<number>
  /** Profissionais disponíveis para novos contratos. */
  availableForNewContracts: Nullable<number>
  coverage: Nullable<string>
  simultaneousCapacity: Nullable<string>
  operationModel: Nullable<'própria' | 'terceirizada' | 'mista'>
}

export interface Differential {
  id: string
  confirmed: boolean
  title: string
  description: string
  icon: string
}

export interface ClientLogo {
  name: string
  logo: string
  /** Confirme a autorização de uso antes de publicar. */
  authorized: boolean
  url?: string
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
  authorized: boolean
}

export interface CaseStudy {
  title: string
  client: string
  summary: string
  result: Nullable<string>
  authorized: boolean
}

export interface Certification {
  name: string
  issuer: string
  validUntil: Nullable<string>
}

export interface ClientsData {
  logos: ClientLogo[]
  testimonials: Testimonial[]
  caseStudies: CaseStudy[]
  certifications: Certification[]
  segments: string[]
  /** Ex.: "Clientes com mais de 5 anos de contrato" — apenas com comprovação. */
  relationshipHighlight: Nullable<string>
}

export interface ProcessStep {
  title: string
  description: string
}

export interface AboutContent {
  /** Marque como true quando o texto tiver sido revisado pela empresa. */
  reviewed: boolean
  statement: string
  blocks: { question: string; answer: string }[]
  commitments: { title: string; description: string; icon: string }[]
}
