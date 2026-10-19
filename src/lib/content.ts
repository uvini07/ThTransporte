import { clients } from '../data/clients.ts'
import { company, heroMedia } from '../data/company.ts'
import { about } from '../data/content.ts'
import { differentials } from '../data/differentials.ts'
import { fleetCategories } from '../data/fleet.ts'
import { services } from '../data/services.ts'
import { team } from '../data/team.ts'
import { isDemo } from './config.ts'
import { yearsSince } from './format.ts'

/**
 * Camada de visibilidade: no modo demonstração tudo aparece (com selos de pendência);
 * na versão pública, apenas o que foi confirmado.
 */
export const visibleServices = services.filter((s) => isDemo || s.confirmed)
export const visibleFleet = fleetCategories.filter((c) => isDemo || c.confirmed)
export const visibleDifferentials = differentials.filter((d) => isDemo || d.confirmed)

export const authorizedLogos = clients.logos.filter((l) => l.authorized)
export const authorizedTestimonials = clients.testimonials.filter((t) => t.authorized)
export const authorizedCases = clients.caseStudies.filter((c) => c.authorized)

/** Total da frota calculado a partir das quantidades de cada categoria confirmada/visível. */
export const fleetTotals = (() => {
  const known = visibleFleet.filter((c) => c.quantity !== null)
  const total = known.reduce((sum, c) => sum + (c.quantity ?? 0), 0)
  return {
    total: known.length ? total : null,
    complete: known.length === visibleFleet.length && visibleFleet.length > 0,
    pendingCategories: visibleFleet.length - known.length,
  }
})()

export const yearsOfExperience = yearsSince(company.foundedYear)

const teamHasData = Object.values(team).some((v) => v !== null)
const clientsHasData =
  authorizedLogos.length + authorizedTestimonials.length + authorizedCases.length + clients.certifications.length + clients.segments.length >
    0 || clients.relationshipHighlight !== null

export type SectionId = 'inicio' | 'servicos' | 'frota' | 'estrutura' | 'diferenciais' | 'sobre' | 'clientes' | 'processo' | 'contato'

export const sectionVisibility: Record<SectionId, boolean> = {
  inicio: true,
  servicos: visibleServices.length > 0,
  frota: visibleFleet.length > 0,
  estrutura: isDemo || teamHasData,
  diferenciais: visibleDifferentials.length > 0,
  sobre: true,
  clientes: isDemo || clientsHasData,
  processo: true,
  contato: true,
}

export const navItems = (
  [
    { id: 'inicio', label: 'Início' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'frota', label: 'Nossa frota' },
    { id: 'processo', label: 'Como funciona' },
    { id: 'contato', label: 'Contato' },
  ] satisfies { id: SectionId; label: string }[]
).filter((item) => sectionVisibility[item.id])

/** Lista automática de informações pendentes, exibida no painel do modo demonstração. */
export function pendingItems(): { group: string; items: string[] }[] {
  const groups: { group: string; items: string[] }[] = []
  const push = (group: string, items: (string | false)[]) => {
    const filtered = items.filter(Boolean) as string[]
    if (filtered.length) groups.push({ group, items: filtered })
  }

  push('Empresa', [
    'Confirmar o nome oficial (provisório: ' + company.name + ')',
    !company.logo && 'Logotipo',
    !heroMedia?.official && 'Foto ou vídeo oficial para o fundo da tela principal',
    !company.slogan && 'Slogan',
    !company.region && 'Região de atuação',
    !company.city && 'Cidade-sede',
    !company.foundedYear && 'Ano de fundação (anos de experiência)',
    company.corporateClients === null && 'Total de clientes corporativos',
    !company.legalName && 'Razão social',
    !company.cnpj && 'CNPJ',
    !company.brandColors && 'Cores institucionais',
  ])
  push('Contato', [
    !company.phone && 'Telefone comercial',
    !company.whatsapp && 'WhatsApp comercial',
    !company.email && 'E-mail comercial',
    !company.domain && 'Domínio do site',
    !import.meta.env.VITE_FORM_ENDPOINT && 'Endpoint do formulário (VITE_FORM_ENDPOINT)',
    !Object.values(company.social).some(Boolean) && 'Redes sociais oficiais',
  ])
  push('Serviços', [
    ...services.filter((s) => !s.confirmed).map((s) => `Confirmar: ${s.title}`),
    ...services.filter((s) => !s.image?.official).map((s) => `Foto oficial — ${s.title}`),
  ])
  push(
    'Frota',
    fleetCategories.flatMap((c) => [
      !c.confirmed && `Confirmar se possui: ${c.name}`,
      c.quantity === null && `Quantidade — ${c.name}`,
      !c.image?.official && `Foto oficial — ${c.name}`,
    ]),
  )
  push('Estrutura operacional', [
    team.totalMembers === null && 'Total de colaboradores',
    team.drivers === null && 'Motoristas',
    team.availableForNewContracts === null && 'Profissionais disponíveis para novos contratos',
    team.coverage === null && 'Cobertura geográfica',
    team.operationModel === null && 'Modelo de operação (própria, terceirizada ou mista)',
  ])
  push('Diferenciais', differentials.filter((d) => !d.confirmed).map((d) => `Confirmar: ${d.title}`))
  push('Credibilidade', [
    !authorizedLogos.length && 'Logotipos de clientes autorizados',
    !authorizedTestimonials.length && 'Depoimentos reais',
    !clients.certifications.length && 'Certificações e licenças válidas',
    !clients.segments.length && 'Segmentos atendidos',
  ])
  push('Textos', [!about.reviewed && 'Revisar textos institucionais (Sobre nós)'])
  return groups
}

const numberedSections: SectionId[] = ['servicos', 'frota', 'processo', 'contato']

/** Numeração editorial (01, 02…) calculada sobre as seções visíveis, sem lacunas. */
export const sectionNumber = (id: SectionId) =>
  String(numberedSections.filter((s) => sectionVisibility[s]).indexOf(id) + 1).padStart(2, '0')
