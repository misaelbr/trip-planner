import { AtSign, Plus, X } from 'lucide-react'
import type { FormEvent } from 'react'

import { Button } from '../../components/button'

interface InviteGuestModalProps {
  emailsToInvite: string[]
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
  removeEmailFromInvites: (email: string) => void
  closeGuestModal: () => void
}

export function InviteGuestModal({
  closeGuestModal,
  addNewEmailToInvite,
  removeEmailFromInvites,
  emailsToInvite,
}: InviteGuestModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Secionar convidados</h2>
            <button onClick={closeGuestModal}>
              <X className="size-5 text-zinc-400 hover:text-zinc-300" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {emailsToInvite.map((email) => {
            return (
              <div
                key={email}
                className="flex items-center gap-2 rounded-md bg-zinc-800 px-2.5 py-1.5"
              >
                <span className="text-zinc-300">{email}</span>
                <button
                  onClick={() => removeEmailFromInvites(email)}
                  type="button"
                >
                  <X className="size-4 text-zinc-400 hover:text-zinc-300" />
                </button>
              </div>
            )
          })}
        </div>
        <div className="h-px w-full bg-zinc-800" />
        <form
          onSubmit={addNewEmailToInvite}
          className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 p-2.5"
        >
          <div className="flex flex-1 items-center gap-2 px-2">
            <AtSign className="size-5 text-zinc-400" />
            <input
              type="email"
              name="email"
              placeholder="Digite o e-mail do convidado"
              className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
            <Button type="submit" variant="primary">
              Convidar <Plus className="size-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
