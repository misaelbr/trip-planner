import { ptBR } from 'date-fns/locale'
import { ArrowRight, Calendar, MapPin, Settings2, X } from 'lucide-react'
import { useState } from 'react'
import { type DateRange, DayPicker } from 'react-day-picker'

import { Button } from '../../../components/button'
import { formatDateRange } from '../../../lib/format-date'

interface DestinationAndDateStepProps {
  isGuestInputOpen: boolean
  openGuestInput: () => void
  closedGuestInput: () => void
  setDestination: (destination: string) => void
  setEventStartAndEndDates: (
    eventStartAndEndDates: DateRange | undefined,
  ) => void
  eventStartAndEndDates: DateRange | undefined
}

export function DestinationAndDateStep({
  isGuestInputOpen,
  openGuestInput,
  closedGuestInput,
  setDestination,
  setEventStartAndEndDates,
  eventStartAndEndDates,
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? formatDateRange(eventStartAndEndDates.from, eventStartAndEndDates.to)
      : null

  return (
    <div className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <input
          type="text"
          placeholder="Para onde você vai?"
          disabled={isGuestInputOpen}
          className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>
      <button
        disabled={isGuestInputOpen}
        onClick={openDatePicker}
        className="flex w-60 items-center gap-2 text-left"
      >
        <Calendar className="size-5 text-zinc-400" />
        <span className="w-44 flex-1 text-lg text-zinc-400">
          {displayedDate || 'Quando?'}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button onClick={closeDatePicker}>
                  <X className="size-5 text-zinc-400 hover:text-zinc-300" />
                </button>
              </div>
            </div>
            <DayPicker
              locale={ptBR}
              mode="range"
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
            />
          </div>
        </div>
      )}
      <div className="h-6 w-px bg-zinc-800" />
      {isGuestInputOpen ? (
        <button
          onClick={closedGuestInput}
          className="bg-zin-800 flex items-center gap-2 rounded-lg px-5 py-2 font-medium text-zinc-200 hover:bg-zinc-700"
        >
          Alterar local/data
          <Settings2 className="size-5" />
        </button>
      ) : (
        <Button onClick={openGuestInput}>
          Continuar <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  )
}
