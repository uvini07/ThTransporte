import { MotionConfig } from 'motion/react'
import { lazy, Suspense } from 'react'
import { DemoPanel } from './components/layout/DemoPanel.tsx'
import { Footer } from './components/layout/Footer.tsx'
import { Header } from './components/layout/Header.tsx'
import { PrivacyPolicy } from './components/layout/PrivacyPolicy.tsx'
import { WhatsAppFloat } from './components/layout/WhatsAppFloat.tsx'
import { Fleet } from './components/sections/Fleet.tsx'
import { Hero } from './components/sections/Hero.tsx'
import { Process } from './components/sections/Process.tsx'
import { Services } from './components/sections/Services.tsx'
import { Marquee } from './components/ui/Marquee.tsx'
import { useHashFlag } from './hooks/useHashFlag.ts'
import { sectionVisibility as show } from './lib/content.ts'

// O formulário (React Hook Form + Zod) é carregado em um chunk separado, fora do caminho crítico.
const Contact = lazy(() => import('./components/sections/Contact.tsx').then((m) => ({ default: m.Contact })))

export default function App() {
  const privacy = useHashFlag('politica-de-privacidade')

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Marquee />
        {show.servicos && <Services />}
        {show.frota && <Fleet />}
        <Process />
        <Suspense fallback={<section id="contato" aria-label="Contato" className="min-h-[70rem] lg:min-h-[56rem]" />}>
          <Contact />
        </Suspense>
      </main>
      <Footer onOpenPrivacy={privacy.openFlag} />
      <PrivacyPolicy open={privacy.open} onClose={privacy.close} />
      <DemoPanel />
      <WhatsAppFloat />
    </MotionConfig>
  )
}
