import { motion } from 'motion/react'
import { whatsappLink } from '../../lib/contact.ts'
import { WhatsAppIcon } from '../ui/BrandIcons.tsx'

/** Botão flutuante do WhatsApp — só aparece quando o número comercial está configurado. */
export function WhatsAppFloat() {
  const href = whatsappLink()
  if (!href) return null
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar pelo WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 300, damping: 22 }}
      className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-[#0b1118] shadow-[0_12px_40px_-10px_rgb(37_211_102/0.7)] transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="size-7" />
    </motion.a>
  )
}
