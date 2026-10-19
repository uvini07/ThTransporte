import { company } from '../../data/company.ts'
import { mailLink } from '../../lib/contact.ts'
import { Dialog } from '../ui/Dialog.tsx'
import { Pending, StatusBadge } from '../ui/Pending.tsx'

/**
 * Modelo de política de privacidade (LGPD). Revise com assessoria jurídica antes de publicar
 * e complete os dados do controlador.
 */
export function PrivacyPolicy({ open, onClose }: { open: boolean; onClose: () => void }) {
  const mail = mailLink('Privacidade — solicitação de titular')
  return (
    <Dialog open={open} onClose={onClose} labelledBy="privacy-title" className="max-w-3xl">
      <article className="p-6 sm:p-10">
        <p className="eyebrow mb-3 text-accent">Documento legal</p>
        <h2 id="privacy-title" className="pr-12 text-3xl font-semibold tracking-tight">
          Política de Privacidade
        </h2>
        <StatusBadge kind="draft" className="mt-4" />
        <div className="mt-8 space-y-6 leading-relaxed text-metal [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-ice">
          <section>
            <h3>1. Controlador dos dados</h3>
            <p>
              {company.legalName ?? company.name}
              {company.cnpj ? `, inscrita no CNPJ ${company.cnpj}` : ''}
              {company.address ? `, com sede em ${company.address}` : ''}. {!company.cnpj && <Pending label="Razão social, CNPJ e endereço" />}
            </p>
          </section>
          <section>
            <h3>2. Dados coletados</h3>
            <p>
              Pelo formulário de orçamento coletamos nome, empresa, cargo (opcional), e-mail, telefone e as informações que você descrever sobre a
              operação desejada. Não coletamos dados sensíveis.
            </p>
          </section>
          <section>
            <h3>3. Finalidade e base legal</h3>
            <p>
              Os dados são usados exclusivamente para responder à sua solicitação e elaborar propostas comerciais, com base no consentimento e em
              procedimentos preliminares a contrato (art. 7º, I e V, da Lei 13.709/2018 — LGPD).
            </p>
          </section>
          <section>
            <h3>4. Compartilhamento</h3>
            <p>
              Os dados não são vendidos. Podem ser processados por fornecedores de tecnologia necessários ao recebimento das mensagens (como o serviço
              de formulários e de e-mail), sob obrigação de confidencialidade.
            </p>
          </section>
          <section>
            <h3>5. Retenção</h3>
            <p>Mantemos os dados pelo tempo necessário ao atendimento da solicitação e às obrigações legais aplicáveis.</p>
          </section>
          <section>
            <h3>6. Seus direitos</h3>
            <p>
              Você pode solicitar confirmação, acesso, correção, anonimização, portabilidade ou exclusão dos seus dados, além de revogar o
              consentimento, pelo canal{' '}
              {mail ? (
                <a href={mail} className="text-ice underline underline-offset-4 hover:text-accent">
                  {company.email}
                </a>
              ) : (
                <Pending label="E-mail do encarregado" />
              )}
              .
            </p>
          </section>
          <section>
            <h3>7. Cookies</h3>
            <p>Este site não utiliza cookies de rastreamento ou publicidade.</p>
          </section>
        </div>
      </article>
    </Dialog>
  )
}
