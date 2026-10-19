import type { ClientsData } from '../types/index.ts'

/**
 * Clientes e provas de credibilidade. Insira somente itens reais e autorizados.
 * Logotipos: coloque os arquivos em /public/clients e referencie como "/clients/nome.svg".
 * Itens com `authorized: false` nunca são exibidos.
 *
 * Exemplo:
 * logos: [{ name: 'Empresa X', logo: '/clients/empresa-x.svg', authorized: true }]
 */
export const clients: ClientsData = {
  logos: [],
  testimonials: [],
  caseStudies: [],
  certifications: [],
  segments: [],
  relationshipHighlight: null,
}
