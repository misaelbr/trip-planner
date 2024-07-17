import { MailCheck, ThumbsUp, User, X } from 'lucide-react'
import type { FormEvent } from 'react'

import { Button } from '../../components/button'
import { formatDateRange } from '../../lib/format-date'

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
  setOwnerName: (ownerName: string) => void
  setOwnerEmail: (ownerEmail: string) => void
  setDetails: {
    destination: string
    dates: { starts_at: string | Date; ends_at: string | Date }
  }
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail,
  setDetails: { destination, dates },
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <button onClick={closeConfirmTripModal}>
              <X className="size-5 text-zinc-400 hover:text-zinc-300" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{' '}
            <span className="font-semibold text-zinc-100">{destination}</span>{' '}
            no período de{' '}
            <span className="font-semibold text-zinc-100">
              {formatDateRange(dates.starts_at, dates.ends_at)}
            </span>{' '}
            preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={createTrip} className="space-y-3">
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <User className="size-5 text-zinc-400" />
            <input
              name="name"
              placeholder="Seu nome completo"
              className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              onChange={(event) => setOwnerName(event.target.value)}
            />
          </div>
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <MailCheck className="size-5 text-zinc-400" />
            <input
              type="email"
              name="persnalEmail"
              placeholder="Seu seu email pessoal"
              className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              onChange={(event) => setOwnerEmail(event.target.value)}
            />
          </div>
          <Button variant="primary" type="submit" size="full">
            Confirmar criação da viagem <ThumbsUp className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
