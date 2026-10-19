import type { Service } from '../types/index.ts'

/**
 * Serviços. Marque `confirmed: true` somente para frentes que a empresa
 * realmente oferece. Itens em `pendingDetails` aparecem como pendências
 * no modo demonstração e devem ser substituídos por dados reais em `highlights`.
 */
export const services: Service[] = [
  {
    id: 'logistica',
    confirmed: false,
    label: 'Logística',
    title: 'Logística e transporte de cargas',
    description:
      'Operações de carga dimensionadas ao volume, à frequência e às janelas de entrega da sua empresa, com planejamento de rota e acompanhamento do início ao fim.',
    highlights: ['Planejamento de coletas e entregas', 'Dimensionamento de veículo por tipo de carga', 'Operações pontuais ou recorrentes'],
    pendingDetails: ['Modalidades de carga atendidas', 'Abrangência geográfica', 'Tipos de operação (fracionada, dedicada etc.)'],
    visual: 'caminhao',
    image: null,
    imageAlt: 'Veículo de carga da frota',
  },
  {
    id: 'corporativo',
    confirmed: false,
    label: 'Corporativo',
    title: 'Transporte corporativo de colaboradores',
    description:
      'Rotas programadas para deslocamento de equipes, com horários alinhados aos turnos da operação e atendimento contínuo durante todo o contrato.',
    highlights: ['Rotas e pontos de embarque planejados', 'Escalas compatíveis com turnos', 'Contratos recorrentes'],
    pendingDetails: ['Modelos de contrato oferecidos', 'Cidades atendidas'],
    visual: 'onibus',
    image: null,
    imageAlt: 'Ônibus de transporte de colaboradores',
  },
  {
    id: 'executivo',
    confirmed: false,
    label: 'Executivo',
    title: 'Transporte executivo',
    description:
      'Deslocamentos para diretores, gestores, clientes e convidados com conforto, discrição e pontualidade — do aeroporto à reunião, da agenda ao evento.',
    highlights: ['Motoristas com apresentação profissional', 'Agenda e itinerário coordenados', 'Atendimento discreto'],
    pendingDetails: ['Modelos de veículos executivos', 'Traslados de aeroporto atendidos'],
    visual: 'sedan',
    image: null,
    imageAlt: 'Carro executivo da frota',
  },
  {
    id: 'eventos',
    confirmed: false,
    label: 'Eventos',
    title: 'Eventos, feiras e grupos',
    description:
      'Logística de passageiros para congressos, convenções, feiras e eventos empresariais, coordenando chegadas, saídas e traslados de grupos.',
    highlights: ['Traslados entre hotel, aeroporto e evento', 'Coordenação de grupos', 'Dimensionamento por número de participantes'],
    pendingDetails: ['Porte máximo de evento atendido'],
    visual: 'microOnibus',
    image: null,
    imageAlt: 'Micro-ônibus para eventos',
  },
  {
    id: 'personalizado',
    confirmed: false,
    label: 'Sob medida',
    title: 'Soluções personalizadas de mobilidade',
    description:
      'Quando a operação não cabe em um formato padrão, combinamos veículos, escalas e modelos de contratação — por demanda, fretamento ou contrato recorrente.',
    highlights: ['Diagnóstico da operação', 'Combinação de categorias de veículos', 'Por demanda, fretamento ou contrato'],
    pendingDetails: ['Modelos de contratação disponíveis'],
    visual: 'vanExecutiva',
    image: null,
    imageAlt: 'Van executiva da frota',
  },
]
