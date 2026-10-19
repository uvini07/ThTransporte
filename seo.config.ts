import { company, seoCopy } from './src/data/company.ts'

const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/**
 * Gera as tags de SEO no build a partir de src/data/company.ts.
 * Dados estruturados (Schema.org) incluem somente campos preenchidos.
 */
export function buildSeoTags(demo: boolean): string {
  const url = company.domain?.replace(/\/$/, '') ?? null
  const tags = [
    `<title>${escape(seoCopy.title)}</title>`,
    `<meta name="description" content="${escape(seoCopy.description)}" />`,
    // Evita indexar a versão de demonstração, que contém dados provisórios.
    demo ? '<meta name="robots" content="noindex, nofollow" />' : '<meta name="robots" content="index, follow" />',
    '<meta property="og:type" content="website" />',
    '<meta property="og:locale" content="pt_BR" />',
    `<meta property="og:site_name" content="${escape(company.name)}" />`,
    `<meta property="og:title" content="${escape(seoCopy.title)}" />`,
    `<meta property="og:description" content="${escape(seoCopy.description)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
  ]
  if (url) {
    tags.push(`<link rel="canonical" href="${url}/" />`, `<meta property="og:url" content="${url}/" />`, `<meta property="og:image" content="${url}/og-image.png" />`)
  } else {
    tags.push('<meta property="og:image" content="/og-image.png" />')
  }

  const contactPoint =
    company.phone || company.email
      ? [
          {
            '@type': 'ContactPoint',
            contactType: 'sales',
            availableLanguage: 'Portuguese',
            ...(company.phone && { telephone: company.phone }),
            ...(company.email && { email: company.email }),
          },
        ]
      : undefined

  const sameAs = Object.values(company.social).filter(Boolean)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    ...(company.legalName && { legalName: company.legalName }),
    ...(url && { url }),
    ...(url && company.logo && { logo: `${url}${company.logo}` }),
    ...(company.slogan && { slogan: company.slogan }),
    ...(company.foundedYear && { foundingDate: String(company.foundedYear) }),
    ...(company.region && { areaServed: company.region }),
    ...(company.address && { address: company.address }),
    ...(company.cnpj && { taxID: company.cnpj }),
    ...(contactPoint && { contactPoint }),
    ...(sameAs.length && { sameAs }),
  }
  tags.push(`<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`)
  return tags.map((t) => `    ${t}`).join('\n')
}
