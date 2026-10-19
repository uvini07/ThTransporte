import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'motion/react'
import { CircleCheck, Info, LoaderCircle, Mail, MapPin, Phone, TriangleAlert } from 'lucide-react'
import { useEffect, useId, useState, type ReactNode } from 'react'
import { useForm, type UseFormRegisterReturn } from 'react-hook-form'
import { company } from '../../data/company.ts'
import { frequencyOptions } from '../../data/content.ts'
import { formEndpoint, isDemo } from '../../lib/config.ts'
import { hasAnyContactChannel, mailLink, phoneLink, whatsappLink } from '../../lib/contact.ts'
import { visibleServices, sectionNumber } from '../../lib/content.ts'
import { ease } from '../../lib/motion.ts'
import { onQuotePrefill } from '../../lib/quote.ts'
import { maskPhone, quoteSchema, type QuoteData, type QuoteInput } from '../../lib/quoteSchema.ts'
import { WhatsAppIcon } from '../ui/BrandIcons.tsx'
import { Button, ButtonLink } from '../ui/Button.tsx'
import { Pending } from '../ui/Pending.tsx'
import { Reveal } from '../ui/Reveal.tsx'
import { SectionHeading } from '../ui/SectionHeading.tsx'

type Status = { kind: 'idle' } | { kind: 'success' } | { kind: 'error'; message: string } | { kind: 'demo'; summary: string }

const serviceOptions = [...visibleServices.map((s) => ({ value: s.id, label: s.title })), { value: 'multiplos', label: 'Mais de um serviço / outro' }]

const inputBase =
  'w-full rounded-[3px] border bg-ink/60 px-4 py-3.5 text-ice placeholder:text-metal/50 transition-[border-color,box-shadow] duration-300 outline-none focus:border-accent focus:shadow-[0_0_0_4px_rgb(54_169_232/0.15)]'

function Field({
  label,
  error,
  optional,
  children,
  className = '',
  hint,
}: {
  label: string
  error?: string
  optional?: boolean
  children: (props: { id: string; describedBy?: string; invalid: boolean }) => ReactNode
  className?: string
  hint?: string
}) {
  const id = useId()
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-2 text-sm font-medium">
        {label}
        {optional && <span className="font-mono text-[0.68rem] tracking-wider text-metal uppercase">Opcional</span>}
      </label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-xs text-metal">
          {hint}
        </p>
      )}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 flex items-start gap-1.5 overflow-hidden text-sm text-[#ff9b8a]"
          >
            <TriangleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const borderFor = (invalid: boolean) => (invalid ? 'border-[#ff9b8a]/70' : 'border-line')

function summarize(data: QuoteData) {
  const service = serviceOptions.find((s) => s.value === data.service)?.label ?? data.service
  return [
    `Solicitação de proposta — ${company.name}`,
    '',
    `Nome: ${data.name}`,
    `Empresa: ${data.company}`,
    data.role ? `Cargo: ${data.role}` : null,
    `E-mail: ${data.email}`,
    `Telefone: ${data.phone}`,
    `Serviço: ${service}`,
    `Volume estimado: ${data.volume}`,
    `Região: ${data.region}`,
    `Frequência: ${data.frequency}`,
    '',
    data.message,
  ]
    .filter((l) => l !== null)
    .join('\n')
}

function ContactChannels() {
  const wa = whatsappLink()
  const tel = phoneLink()
  const mail = mailLink('Solicitação de proposta corporativa')
  const items = [
    { icon: <WhatsAppIcon className="size-5" />, label: 'WhatsApp comercial', value: company.whatsapp && maskPhone(company.whatsapp.replace(/^55/, '')), href: wa, external: true },
    { icon: <Phone className="size-5" aria-hidden />, label: 'Telefone', value: company.phone, href: tel },
    { icon: <Mail className="size-5" aria-hidden />, label: 'E-mail comercial', value: company.email, href: mail },
    { icon: <MapPin className="size-5" aria-hidden />, label: 'Região de atuação', value: company.region, href: null },
  ].filter((i) => isDemo || i.value)

  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((item) => {
        const content = (
          <>
            <span className="chamfer chamfer-sm grid size-11 shrink-0 place-items-center bg-ice/[0.07] text-accent transition-colors group-hover:bg-accent group-hover:text-ink">{item.icon}</span>
            <span className="min-w-0">
              <span className="eyebrow block text-metal">{item.label}</span>
              <span className="mt-1 block truncate text-lg font-medium">{item.value ?? <Pending />}</span>
            </span>
          </>
        )
        return (
          <li key={item.label}>
            {item.href && item.value ? (
              <a
                href={item.href}
                className="group flex items-center gap-4 py-4 transition-colors hover:text-accent"
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {content}
              </a>
            ) : (
              <div className="flex items-center gap-4 py-4">{content}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export function Contact() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput, unknown, QuoteData>({
    resolver: zodResolver(quoteSchema),
    mode: 'onTouched',
    defaultValues: { service: '', frequency: '' as QuoteInput['frequency'], website: '' },
  })

  useEffect(
    () =>
      onQuotePrefill(({ service, details }) => {
        if (service) setValue('service', service, { shouldValidate: false })
        if (details && !getValues('message')?.includes(details)) {
          const current = getValues('message')
          setValue('message', current ? `${current}\n${details}` : details)
        }
        setStatus({ kind: 'idle' })
      }),
    [setValue, getValues],
  )

  const onSubmit = async (data: QuoteData) => {
    if (data.website) return // robô
    if (!formEndpoint) {
      setStatus({ kind: 'demo', summary: summarize(data) })
      return
    }
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 15000)
    try {
      const { website: _ignored, ...payload } = data
      void _ignored
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...payload, _subject: `Proposta corporativa — ${data.company}`, origem: window.location.href }),
        signal: controller.signal,
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      setStatus({ kind: 'success' })
      reset()
    } catch (error) {
      const aborted = error instanceof DOMException && error.name === 'AbortError'
      setStatus({
        kind: 'error',
        message: aborted
          ? 'O envio demorou mais que o esperado. Verifique sua conexão e tente novamente.'
          : 'Não foi possível enviar sua solicitação agora. Tente novamente em instantes ou use um dos canais ao lado.',
      })
    } finally {
      window.clearTimeout(timeout)
    }
  }

  const reg = (name: keyof QuoteInput, invalid: boolean, describedBy?: string): UseFormRegisterReturn & Record<string, unknown> => ({
    ...register(name),
    'aria-invalid': invalid || undefined,
    'aria-describedby': describedBy,
  })

  return (
    <section id="contato" aria-labelledby="contato-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading stacked id="contato-title" index={sectionNumber('contato')} eyebrow="Orçamento corporativo" title="Peça uma *proposta.*" />
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-sm text-[0.95rem] text-metal">Respondemos com uma proposta sob medida.</p>
            </Reveal>
            <Reveal delay={0.15} className="mt-10">
              <ContactChannels />
            </Reveal>
            {whatsappLink() && (
              <Reveal delay={0.2} className="mt-8">
                <ButtonLink href={whatsappLink()!} target="_blank" rel="noopener noreferrer" variant="secondary" icon={false}>
                  <WhatsAppIcon className="size-5 text-[#25d366]" />
                  Conversar pelo WhatsApp
                </ButtonLink>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="chamfer chamfer-lg relative bg-graphite p-6 sm:p-10">
              {!formEndpoint && (
                <div role="note" className="chamfer chamfer-sm mb-8 flex gap-3 bg-warn/10 p-4 text-sm text-ice">
                  <Info className="mt-0.5 size-5 shrink-0 text-warn" aria-hidden />
                  <p>
                    <strong className="font-semibold">Formulário em modo de demonstração.</strong> A integração de envio ainda não foi configurada, então as
                    mensagens <strong>não</strong> são enviadas por aqui.{' '}
                    {hasAnyContactChannel() ? 'Use os canais de contato ao lado.' : 'Os canais de contato da empresa também ainda não foram configurados.'}
                  </p>
                </div>
              )}

              <AnimatePresence mode="wait" initial={false}>
                {status.kind === 'success' ? (
                  <motion.div
                    key="success"
                    role="status"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: ease.out }}
                    className="flex flex-col items-start gap-5 py-10"
                  >
                    <CircleCheck className="size-12 text-accent" aria-hidden />
                    <h3 className="display text-3xl">Solicitação enviada.</h3>
                    <p className="max-w-md text-metal">Recebemos seus dados e nossa equipe comercial retornará pelo e-mail ou telefone informado.</p>
                    <Button type="button" variant="secondary" onClick={() => setStatus({ kind: 'idle' })}>
                      Enviar outra solicitação
                    </Button>
                  </motion.div>
                ) : status.kind === 'demo' ? (
                  <motion.div
                    key="demo"
                    role="status"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: ease.out }}
                    className="flex flex-col items-start gap-5 py-4"
                  >
                    <TriangleAlert className="size-10 text-warn" aria-hidden />
                    <h3 className="display text-2xl">Dados validados, mas não enviados.</h3>
                    <p className="max-w-lg text-metal">
                      O formulário está em modo de demonstração. Nenhuma informação foi transmitida.
                      {hasAnyContactChannel() ? ' Envie o resumo abaixo por um dos canais disponíveis:' : ' Configure VITE_FORM_ENDPOINT para ativar o envio.'}
                    </p>
                    <pre className="max-h-56 w-full overflow-auto rounded-[3px] border border-line bg-ink/60 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap text-metal">
                      {status.summary}
                    </pre>
                    <div className="flex flex-wrap gap-3">
                      {mailLink('Solicitação de proposta corporativa', status.summary) && (
                        <ButtonLink href={mailLink('Solicitação de proposta corporativa', status.summary)!}>Enviar por e-mail</ButtonLink>
                      )}
                      {whatsappLink(status.summary) && (
                        <ButtonLink href={whatsappLink(status.summary)!} target="_blank" rel="noopener noreferrer" variant="secondary">
                          Enviar pelo WhatsApp
                        </ButtonLink>
                      )}
                      <Button type="button" variant="secondary" icon={false} onClick={() => setStatus({ kind: 'idle' })}>
                        Voltar ao formulário
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid gap-5 sm:grid-cols-2"
                    aria-describedby="form-required-note"
                  >
                    <p id="form-required-note" className="text-sm text-metal sm:col-span-2">
                      Todos os campos são obrigatórios, exceto quando indicado.
                    </p>

                    <Field label="Nome" error={errors.name?.message}>
                      {({ id, describedBy, invalid }) => (
                        <input id={id} autoComplete="name" className={`${inputBase} ${borderFor(invalid)}`} {...reg('name', invalid, describedBy)} />
                      )}
                    </Field>
                    <Field label="Empresa" error={errors.company?.message}>
                      {({ id, describedBy, invalid }) => (
                        <input id={id} autoComplete="organization" className={`${inputBase} ${borderFor(invalid)}`} {...reg('company', invalid, describedBy)} />
                      )}
                    </Field>
                    <Field label="Cargo" optional error={errors.role?.message}>
                      {({ id, describedBy, invalid }) => (
                        <input id={id} autoComplete="organization-title" className={`${inputBase} ${borderFor(invalid)}`} {...reg('role', invalid, describedBy)} />
                      )}
                    </Field>
                    <Field label="E-mail corporativo" error={errors.email?.message}>
                      {({ id, describedBy, invalid }) => (
                        <input
                          id={id}
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          placeholder="nome@empresa.com.br"
                          className={`${inputBase} ${borderFor(invalid)}`}
                          {...reg('email', invalid, describedBy)}
                        />
                      )}
                    </Field>
                    <Field label="Telefone" error={errors.phone?.message}>
                      {({ id, describedBy, invalid }) => {
                        // Registrado aqui para manter a ordem dos campos (foco no primeiro erro).
                        const field = register('phone')
                        return (
                          <input
                            id={id}
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel-national"
                            placeholder="(11) 91234-5678"
                            className={`${inputBase} ${borderFor(invalid)}`}
                            aria-invalid={invalid || undefined}
                            aria-describedby={describedBy}
                            {...field}
                            onChange={(e) => {
                              e.target.value = maskPhone(e.target.value)
                              return field.onChange(e)
                            }}
                          />
                        )
                      }}
                    </Field>
                    <Field label="Tipo de serviço" error={errors.service?.message}>
                      {({ id, describedBy, invalid }) => (
                        <select id={id} className={`${inputBase} ${borderFor(invalid)} appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23aab4c0%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] pr-10`} {...reg('service', invalid, describedBy)}>
                          <option value="">Selecione</option>
                          {serviceOptions.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </Field>
                    <Field label="Veículos ou passageiros (aprox.)" error={errors.volume?.message}>
                      {({ id, describedBy, invalid }) => (
                        <input id={id} placeholder="Ex.: 3 vans ou 40 passageiros/dia" className={`${inputBase} ${borderFor(invalid)}`} {...reg('volume', invalid, describedBy)} />
                      )}
                    </Field>
                    <Field label="Região de atendimento" error={errors.region?.message}>
                      {({ id, describedBy, invalid }) => (
                        <input id={id} autoComplete="address-level2" placeholder="Cidade ou região" className={`${inputBase} ${borderFor(invalid)}`} {...reg('region', invalid, describedBy)} />
                      )}
                    </Field>
                    <Field label="Frequência da operação" error={errors.frequency?.message} className="sm:col-span-2">
                      {({ id, describedBy, invalid }) => (
                        <select id={id} className={`${inputBase} ${borderFor(invalid)} appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23aab4c0%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] pr-10`} {...reg('frequency', invalid, describedBy)}>
                          <option value="" disabled>
                            Selecione
                          </option>
                          {frequencyOptions.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      )}
                    </Field>
                    <Field label="Descrição da necessidade" error={errors.message?.message} className="sm:col-span-2" hint="Horários, trajetos, número de pessoas, tipo de carga, prazos.">
                      {({ id, describedBy, invalid }) => (
                        <textarea id={id} rows={5} className={`${inputBase} ${borderFor(invalid)} resize-y`} {...reg('message', invalid, describedBy)} />
                      )}
                    </Field>

                    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                      <label>
                        Não preencha este campo
                        <input tabIndex={-1} autoComplete="off" {...register('website')} />
                      </label>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="flex cursor-pointer items-start gap-3 text-sm text-metal">
                        <input
                          type="checkbox"
                          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-[#36a9e8]"
                          aria-invalid={errors.consent ? true : undefined}
                          aria-describedby={errors.consent ? 'consent-error' : undefined}
                          {...register('consent')}
                        />
                        <span>
                          Autorizo o uso dos meus dados para contato comercial sobre esta solicitação, conforme a{' '}
                          <a href="#politica-de-privacidade" className="text-ice underline decoration-accent/60 underline-offset-4 hover:text-accent">
                            Política de Privacidade
                          </a>
                          .
                        </span>
                      </label>
                      {errors.consent && (
                        <p id="consent-error" className="mt-1.5 flex items-start gap-1.5 text-sm text-[#ff9b8a]">
                          <TriangleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                          {errors.consent.message}
                        </p>
                      )}
                    </div>

                    {status.kind === 'error' && (
                      <div role="alert" className="chamfer chamfer-sm flex gap-3 bg-[#ff9b8a]/10 p-4 text-sm sm:col-span-2">
                        <TriangleAlert className="mt-0.5 size-5 shrink-0 text-[#ff9b8a]" aria-hidden />
                        {status.message}
                      </div>
                    )}

                    <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                      <Button type="submit" disabled={isSubmitting} icon={!isSubmitting} className="w-full sm:w-auto">
                        {isSubmitting ? (
                          <span className="inline-flex items-center gap-2">
                            <LoaderCircle className="size-4 animate-spin" aria-hidden /> Enviando…
                          </span>
                        ) : formEndpoint ? (
                          'Enviar solicitação'
                        ) : (
                          'Validar solicitação'
                        )}
                      </Button>
                      <p className="text-xs text-metal" aria-live="polite">
                        {isSubmitting ? 'Enviando sua solicitação…' : formEndpoint ? 'Seus dados são tratados conforme a Política de Privacidade.' : 'Modo demonstração: nada será enviado.'}
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
