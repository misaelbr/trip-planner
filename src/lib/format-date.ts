import { format, isSameMonth, isSameYear } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatDateRange(
  from: string | Date | undefined,
  to: string | Date | undefined,
) {
  const startDate = from
  const endDate = to

  if (!startDate || !endDate) {
    return ''
  }

  const sameMonth = isSameMonth(startDate, endDate)
  const sameYear = isSameYear(startDate, endDate)

  if (sameMonth && sameYear) {
    return `${format(startDate, 'dd')} até ${format(endDate, 'dd')} de ${format(startDate, 'LLLL', { locale: ptBR })}`
  } else if (!sameYear) {
    return `${format(startDate, 'dd')} de ${format(startDate, 'LLL', { locale: ptBR })}/${format(startDate, 'yy')} até ${format(endDate, 'dd')} de ${format(endDate, 'LLL', { locale: ptBR })}/${format(endDate, 'yy')}`
  } else {
    return `${format(startDate, 'dd')} de ${format(startDate, 'LLL', { locale: ptBR })} a ${format(endDate, 'dd')} de ${format(endDate, 'LLL', { locale: ptBR })}`
  }
}
