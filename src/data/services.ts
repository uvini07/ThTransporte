import type { Service } from '../types/index.ts'
import { photos } from './photos.ts'

/**
 * Serviços. Marque `confirmed: true` somente para frentes que a empresa
 * realmente oferece. Itens em `pendingDetails` aparecem como pendências
 * no modo demonstração e devem ser substituídos por dados reais em `highlights`.
 */
export const services: Service[] = [
  {
    id: 'corporativo',
    confirmed: true,
    label: 'Corporativo',
    title: 'Transporte corporativo de colaboradores',
    description:
      'Rotas programadas para as suas equipes, alinhadas aos turnos.',
    highlights: ['Rotas e pontos de embarque planejados', 'Escalas compatíveis com turnos', 'Contratos recorrentes'],
    pendingDetails: ['Modelos de contrato oferecidos', 'Cidades atendidas'],
    visual: 'onibus',
    image: photos.vansOnibus,
  },
  {
    id: 'executivo',
    confirmed: true,
    label: 'Executivo',
    title: 'Transporte executivo',
    description:
      'Conforto, discrição e pontualidade para executivos e convidados.',
    highlights: ['Motoristas com apresentação profissional', 'Agenda e itinerário coordenados', 'Atendimento discreto'],
    pendingDetails: ['Modelos de veículos executivos', 'Traslados de aeroporto atendidos'],
    visual: 'sedan',
    image: photos.sprinterCampo,
  },
  {
    id: 'eventos',
    confirmed: true,
    label: 'Eventos',
    title: 'Eventos, feiras e grupos',
    description:
      'Traslados coordenados para feiras, congressos e grupos.',
    highlights: ['Traslados entre hotel, aeroporto e evento', 'Coordenação de grupos', 'Dimensionamento por número de participantes'],
    pendingDetails: ['Porte máximo de evento atendido'],
    visual: 'microOnibus',
    image: photos.sprinterTrio,
  },
  {
    id: 'personalizado',
    confirmed: true,
    label: 'Sob medida',
    title: 'Soluções personalizadas de mobilidade',
    description:
      'Veículos, escalas e contratos combinados conforme a demanda.',
    highlights: ['Diagnóstico da operação', 'Combinação de categorias de veículos', 'Por demanda, fretamento ou contrato'],
    pendingDetails: ['Modelos de contratação disponíveis'],
    visual: 'vanExecutiva',
    image: photos.minivanSpin,
  },
]
