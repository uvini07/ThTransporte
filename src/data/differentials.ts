import type { Differential } from '../types/index.ts'

/**
 * Diferenciais e segurança operacional. Publique (`confirmed: true`) apenas o que a
 * empresa pratica e pode comprovar. Não declare rastreamento em tempo real,
 * atendimento 24 h ou certificações sem confirmação.
 * `icon` aceita os nomes mapeados em components/ui/Icon.tsx.
 */
export const differentials: Differential[] = [
  { id: 'rotas', confirmed: false, icon: 'route', title: 'Planejamento de rotas', description: 'Trajetos, horários e pontos de embarque definidos antes do início da operação.' },
  { id: 'frota', confirmed: false, icon: 'gauge', title: 'Gestão de frota', description: 'Controle de disponibilidade e alocação de veículos por contrato.' },
  { id: 'manutencao', confirmed: false, icon: 'wrench', title: 'Manutenção preventiva', description: 'Revisões programadas para reduzir paradas não planejadas.' },
  { id: 'treinamento', confirmed: false, icon: 'graduation', title: 'Treinamento de profissionais', description: 'Capacitação contínua de motoristas e equipe de operação.' },
  { id: 'monitoramento', confirmed: false, icon: 'radar', title: 'Monitoramento operacional', description: 'Acompanhamento da execução das viagens e das escalas.' },
  { id: 'horarios', confirmed: false, icon: 'clock', title: 'Gestão de horários', description: 'Escalas alinhadas a turnos, agendas e janelas de entrega.' },
  { id: 'flexibilidade', confirmed: false, icon: 'shuffle', title: 'Flexibilidade de atendimento', description: 'Ajustes de volume e de rota conforme a demanda do cliente.' },
  { id: 'suporte', confirmed: false, icon: 'headset', title: 'Suporte ao cliente', description: 'Canal direto com a equipe responsável pelo contrato.' },
  { id: 'seguranca', confirmed: false, icon: 'shield', title: 'Processos de segurança', description: 'Procedimentos padronizados para embarque, condução e transporte de cargas.' },
  { id: 'documentacao', confirmed: false, icon: 'file', title: 'Documentação e licenças', description: 'Veículos e profissionais com a documentação aplicável a cada operação.' },
]
