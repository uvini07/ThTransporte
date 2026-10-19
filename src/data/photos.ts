import type { Photo } from '../types/index.ts'

/**
 * Biblioteca de fotos enviadas para o site.
 * Estas imagens são de REFERÊNCIA (não identificadas como frota própria), por isso
 * `official: false` e o selo "Foto ilustrativa". Quando houver fotos reais da frota,
 * substitua os arquivos em /public/fleet e marque `official: true`.
 * Confirme o direito de uso de cada imagem antes da publicação.
 */
const sizes = (base: string, large: number) => ({
  src: `${base}-${large}.webp`,
  srcSet: `${base}-640.webp 640w, ${base}-${large}.webp ${large}w`,
})

export const photos = {
  rodovia: {
    src: '/media/rodovia-533.webp',
    alt: 'Vista aérea de uma rodovia ao entardecer com faixas de luz dos veículos',
    official: false,
  },
  minivanSpin: {
    ...sizes('/fleet/minivan-spin', 1200),
    alt: 'Minivan de sete lugares na cor grafite, vista frontal',
    official: false,
    position: '55% 60%',
  },
  minivanDoblo: {
    ...sizes('/fleet/minivan-doblo', 1200),
    alt: 'Minivan de passageiros branca, vista lateral dianteira',
    official: false,
    position: '45% 55%',
  },
  vansOnibus: {
    ...sizes('/fleet/frota-vans-onibus', 1057),
    alt: 'Vans e ônibus brancos estacionados lado a lado sob céu azul',
    official: false,
    position: '50% 60%',
  },
  sprinterTrio: {
    ...sizes('/fleet/vans-sprinter-trio', 750),
    alt: 'Três vans executivas brancas enfileiradas em uma estrada de terra entre árvores',
    official: false,
    position: '60% 55%',
  },
  sprinterCampo: {
    ...sizes('/fleet/vans-sprinter-campo', 1200),
    alt: 'Três vans de passageiros, duas brancas e uma grafite, estacionadas em um gramado',
    official: false,
    position: '55% 62%',
  },
} satisfies Record<string, Photo>
