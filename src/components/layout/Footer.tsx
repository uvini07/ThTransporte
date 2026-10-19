import { motion } from 'motion/react'
import { company } from '../../data/company.ts'
import { photos } from '../../data/photos.ts'
import { isDemo } from '../../lib/config.ts'
import { mailLink, phoneLink, whatsappLink } from '../../lib/contact.ts'
import { navItems } from '../../lib/content.ts'
import { ButtonLink } from '../ui/Button.tsx'
import { BrandLogo } from '../ui/BrandLogo.tsx'
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon } from '../ui/BrandIcons.tsx'
import { MaskText } from '../ui/MaskText.tsx'
import { Pending } from '../ui/Pending.tsx'
import { Reveal } from '../ui/Reveal.tsx'

const socials = [
  { key: 'linkedin', label: 'LinkedIn', Icon: LinkedinIcon },
  { key: 'instagram', label: 'Instagram', Icon: InstagramIcon },
  { key: 'facebook', label: 'Facebook', Icon: FacebookIcon },
  { key: 'youtube', label: 'YouTube', Icon: YoutubeIcon },
] as const

export function Footer({ onOpenPrivacy }: { onOpenPrivacy: () => void }) {
  const wa = whatsappLink()
  const tel = phoneLink()
  const mail = mailLink()
  const activeSocials = socials.filter((s) => company.social[s.key])
  const year = new Date().getFullYear()
  const contactItems = [
    { label: 'Telefone', value: company.phone, href: tel },
    { label: 'WhatsApp', value: company.whatsapp ? 'Conversar agora' : null, href: wa, external: true },
    { label: 'E-mail', value: company.email, href: mail },
    { label: 'Região de atuação', value: company.region, href: null },
  ].filter((i) => isDemo || i.value)

  return (
    <footer className="relative overflow-hidden">
      {/* Encerramento */}
      <div className="relative">
        {/* Foto de encerramento com corte diagonal no topo */}
        <div aria-hidden className="pointer-events-none absolute inset-0 [clip-path:polygon(0_5vw,100%_0,100%_100%,0_100%)]">
          <img
            src={photos.sprinterCampo.src}
            srcSet={photos.sprinterCampo.srcSet}
            sizes="100vw"
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover opacity-35 grayscale-[40%]"
            style={{ objectPosition: photos.sprinterCampo.position }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
        </div>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(60%_80%_at_50%_100%,black,transparent)]" />
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(54_169_232/0.22),transparent)]" />
        <div className="container-page relative py-20 text-center sm:py-28">
          <MaskText
            as="h2"
            text="Vamos planejar a *próxima operação* da sua empresa?"
            className="display mx-auto max-w-[18ch] text-[clamp(1.8rem,3.6vw,3.3rem)] leading-[1.05]"
          />
          <Reveal delay={0.3} className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="#contato">Solicitar proposta</ButtonLink>
            {wa && (
              <ButtonLink href={wa} target="_blank" rel="noopener noreferrer" variant="secondary">
                Falar no WhatsApp
              </ButtonLink>
            )}
          </Reveal>
        </div>
      </div>

      <motion.div aria-hidden className="h-px origin-center bg-gradient-to-r from-transparent via-accent/60 to-transparent" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }} />

      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <BrandLogo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-metal">
            {company.slogan ?? 'Transporte corporativo, executivo, eventos e logística para empresas.'}
          </p>
          {activeSocials.length > 0 && (
            <ul className="mt-6 flex gap-2">
              {activeSocials.map(({ key, label, Icon }) => (
                <li key={key}>
                  <a
                    href={company.social[key]!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${company.name} no ${label}`}
                    className="chamfer chamfer-sm grid size-11 place-items-center bg-ice/[0.07] text-metal transition-colors hover:bg-accent hover:text-ink"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          )}
          {!activeSocials.length && isDemo && (
            <p className="mt-6 flex items-center gap-2 text-sm text-metal">
              Redes sociais <Pending />
            </p>
          )}
        </div>

        <nav aria-label="Rodapé" className="md:col-span-3">
          <h2 className="eyebrow mb-5 text-metal">Navegação</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm md:grid-cols-1">
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="text-ice/80 transition-colors hover:text-accent">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {contactItems.length > 0 && (
          <div className="md:col-span-5">
            <h2 className="eyebrow mb-5 text-metal">Contato</h2>
            <dl className="grid gap-4 text-sm sm:grid-cols-2">
              {contactItems.map((i) => (
                <div key={i.label}>
                  <dt className="text-metal">{i.label}</dt>
                  <dd className="mt-1">
                    {i.value ? (
                      i.href ? (
                        <a href={i.href} className="text-ice transition-colors hover:text-accent" {...(i.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                          {i.value}
                        </a>
                      ) : (
                        i.value
                      )
                    ) : (
                      <Pending />
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>

      <div className="border-t border-line">
        <div className={`container-page flex flex-col gap-4 py-8 text-xs text-metal md:flex-row md:items-center md:justify-between ${isDemo ? 'pb-24 md:pb-8 md:pl-72 lg:pl-80' : ''}`}>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-2">
            <span>
              © {year} {company.legalName ?? company.name}.
            </span>
            {company.cnpj ? <span>CNPJ {company.cnpj}</span> : isDemo && <Pending label="Razão social e CNPJ a informar" />}
            {company.address && <span>· {company.address}</span>}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="#politica-de-privacidade"
              onClick={(e) => {
                e.preventDefault()
                onOpenPrivacy()
              }}
              className="underline-offset-4 transition-colors hover:text-ice hover:underline"
            >
              Política de Privacidade
            </a>
            <a href="#inicio" className="transition-colors hover:text-ice">
              Voltar ao topo ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
