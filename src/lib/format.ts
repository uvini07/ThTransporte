const numberFormat = new Intl.NumberFormat('pt-BR')

export const formatNumber = (value: number) => numberFormat.format(value)

export const yearsSince = (year: number | null): number | null =>
  year ? Math.max(0, new Date().getFullYear() - year) : null
