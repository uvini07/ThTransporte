import type { AboutContent, ProcessStep } from '../types/index.ts'

/**
 * Textos institucionais. São rascunhos coerentes com o negócio e devem ser
 * revisados pela empresa. Depois da revisão, marque `reviewed: true` para
 * remover o selo "Texto provisório".
 */
export const about: AboutContent = {
  reviewed: false,
  statement:
    'Mais do que transportar pessoas e cargas, nosso propósito é manter negócios em movimento. Planejamos cada operação para conectar pessoas, reduzir complexidades e oferecer mobilidade alinhada à necessidade de cada empresa.',
  blocks: [
    {
      question: 'Quem somos',
      answer:
        'Uma empresa de transporte dedicada ao mercado corporativo, atuando em mobilidade de colaboradores, transporte executivo, eventos e logística.',
    },
    {
      question: 'O que resolvemos',
      answer:
        'Tiramos da sua equipe a complexidade de coordenar veículos, motoristas, escalas e rotas — para que o deslocamento deixe de ser um problema operacional.',
    },
    {
      question: 'Como operamos',
      answer:
        'Cada contrato começa com o entendimento da operação: volumes, horários, trajetos e perfil de quem será transportado. A partir disso dimensionamos frota, equipe e rotina de acompanhamento.',
    },
    {
      question: 'Por que nos contratar',
      answer:
        'Porque a sua operação recebe um único parceiro responsável por planejar, executar e ajustar o transporte, com um canal direto para decisões rápidas.',
    },
  ],
  commitments: [
    { icon: 'shield', title: 'Segurança', description: 'Condução responsável e procedimentos claros em cada etapa.' },
    { icon: 'clock', title: 'Pontualidade', description: 'Horários tratados como compromisso contratual.' },
    { icon: 'headset', title: 'Atendimento', description: 'Interlocução direta com quem conhece a sua operação.' },
    { icon: 'check', title: 'Qualidade', description: 'Veículos e profissionais preparados para o padrão corporativo.' },
  ],
}

export const processSteps: ProcessStep[] = [
  {
    title: 'Entendimento da necessidade',
    description: 'Conversamos com a sua equipe para mapear volumes, horários, trajetos e perfil dos passageiros ou das cargas.',
  },
  {
    title: 'Dimensionamento da solução',
    description: 'Definimos categorias de veículos, quantidade de profissionais, rotas e modelo de atendimento.',
  },
  {
    title: 'Apresentação da proposta',
    description: 'Você recebe uma proposta objetiva, com escopo, condições e cronograma de implantação.',
  },
  {
    title: 'Início da operação',
    description: 'Implantamos a operação com acompanhamento próximo nas primeiras semanas e ajustes contínuos.',
  },
]

export const frequencyOptions = [
  'Pontual (uma única vez)',
  'Eventual (algumas vezes ao ano)',
  'Recorrente semanal',
  'Diária / contínua',
  'A definir',
] as const
