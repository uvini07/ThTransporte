import type { FleetCategory, FleetGroup } from '../types/index.ts'
import { photos } from './photos.ts'

export const fleetGroups: { id: FleetGroup | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'executivo', label: 'Executivo' },
  { id: 'passageiros', label: 'Passageiros' },
]

/**
 * Frota por categoria. Regras:
 * - `quantity` é a quantidade própria da categoria; cada veículo conta em uma única categoria
 *   (ex.: vans executivas NÃO devem ser somadas também em "Vans").
 * - O total exibido no site é calculado a partir destes números (lib/fleet.ts).
 * - Remova as categorias que a empresa não possui ou deixe `confirmed: true`.
 * - `image` deve ser uma fotografia real da frota. Sem ela, o site usa a ilustração
 *   técnica com o selo "Imagem ilustrativa".
 */
export const fleetCategories: FleetCategory[] = [
  {
    id: 'carros-executivos',
    confirmed: true,
    name: 'Carros executivos',
    group: 'executivo',
    quantity: 6,
    passengerCapacity: 'Até 4 passageiros',
    cargoCapacity: null,
    description: 'Veículos para deslocamento de diretores, gestores e convidados com conforto e discrição.',
    features: ['Climatização', 'Acabamento interno executivo', 'Porta-malas para bagagem executiva'],
    applications: ['Traslados de aeroporto', 'Agendas executivas', 'Recepção de clientes'],
    availability: 'Sob agendamento',
    visual: 'sedan',
    image: null,
    gallery: [],
  },
  {
    id: 'suvs',
    confirmed: true,
    name: 'SUVs',
    group: 'executivo',
    quantity: 4,
    passengerCapacity: 'Até 4 passageiros',
    cargoCapacity: null,
    description: 'Mais espaço interno e altura de rodagem para deslocamentos executivos em diferentes trajetos.',
    features: ['Espaço interno ampliado', 'Climatização', 'Maior capacidade de bagagem'],
    applications: ['Comitivas pequenas', 'Visitas técnicas', 'Trajetos intermunicipais'],
    availability: 'Sob agendamento',
    visual: 'suv',
    image: null,
    gallery: [],
  },
  {
    id: 'vans-executivas',
    confirmed: true,
    name: 'Vans executivas',
    group: 'executivo',
    quantity: 8,
    passengerCapacity: 'Até 12 passageiros',
    cargoCapacity: null,
    description: 'Configuração interna premium para grupos executivos que precisam viajar juntos.',
    features: ['Poltronas individuais', 'Climatização', 'Vidros escurecidos'],
    applications: ['Comitivas de diretoria', 'Roadshows', 'Recepção de delegações'],
    availability: 'Sob agendamento',
    visual: 'vanExecutiva',
    image: photos.sprinterCampo,
    gallery: [],
  },
  {
    id: 'minivans',
    confirmed: true,
    name: 'Minivans 7 lugares',
    group: 'passageiros',
    quantity: 10,
    passengerCapacity: 'Até 6 passageiros',
    cargoCapacity: null,
    description: 'Compactas e versáteis para equipes pequenas, visitas técnicas e deslocamentos urbanos.',
    features: ['Climatização', 'Configuração para até 7 ocupantes (conforme modelo)', 'Porta-malas versátil'],
    applications: ['Equipes pequenas', 'Visitas a clientes', 'Traslados urbanos'],
    availability: 'Sob agendamento',
    visual: 'suv',
    image: photos.minivanSpin,
    gallery: [photos.minivanSpin, photos.minivanDoblo],
  },
  {
    id: 'vans',
    confirmed: true,
    name: 'Vans',
    group: 'passageiros',
    quantity: 14,
    passengerCapacity: 'Até 15 passageiros',
    cargoCapacity: null,
    description: 'Versatilidade para rotas de colaboradores, traslados e grupos de médio porte.',
    features: ['Climatização', 'Cintos em todos os assentos', 'Acesso facilitado'],
    applications: ['Rotas de colaboradores', 'Traslados para eventos', 'Visitas técnicas'],
    availability: 'Sob agendamento',
    visual: 'van',
    image: photos.sprinterTrio,
    gallery: [],
  },
  {
    id: 'micro-onibus',
    confirmed: true,
    name: 'Micro-ônibus',
    group: 'passageiros',
    quantity: 5,
    passengerCapacity: 'Até 28 passageiros',
    cargoCapacity: null,
    description: 'Equilíbrio entre capacidade e agilidade para grupos e rotas urbanas.',
    features: ['Climatização', 'Bagageiro', 'Poltronas reclináveis'],
    applications: ['Eventos e congressos', 'Rotas de turno', 'Viagens corporativas'],
    availability: 'Sob agendamento',
    visual: 'microOnibus',
    image: null,
    gallery: [],
  },
]
