import type { SVGProps } from 'react'

/** Ícones de marcas (redes sociais e WhatsApp) desenhados localmente. */
type P = SVGProps<SVGSVGElement>

const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const

export const WhatsAppIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3.5 20.5l1.3-4.1A8.5 8.5 0 1 1 8 19.4z" />
    <path d="M9 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.7l-.5.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.5c.2-.2.5-.2.7-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.6.8-1.6.7-4.5-.6-6-2.2-1.6-1.6-2.8-4.4-2.2-6z" />
  </svg>
)

export const InstagramIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </svg>
)

export const LinkedinIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path d="M8 10.5V16M8 7.8v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.8 2.2 2.6V16" />
  </svg>
)

export const FacebookIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M14.5 8.5H16V5.2c-.3 0-1.2-.2-2.3-.2-2.3 0-3.7 1.4-3.7 4v2.3H7.5v3.4H10V21h3.3v-6.3H16l.4-3.4h-3.1V9.4c0-.6.3-.9 1.2-.9z" />
  </svg>
)

export const YoutubeIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="2.8" y="5.5" width="18.4" height="13" rx="4" />
    <path d="M10.2 9.4v5.2l4.4-2.6z" fill="currentColor" />
  </svg>
)
