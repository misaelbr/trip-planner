import { ArrowRight, UserRoundPlus } from 'lucide-react'

import { Button } from '../../../components/button'

interface InviteGuestStepProps {
  openGuestModal: () => void
  openConfirmTripModal: () => void
  emailsToInvite: string[]
}

export function InviteGuestStep({
  openGuestModal,
  openConfirmTripModal,
  emailsToInvite,
}: InviteGuestStepProps) {
  return (
    <div className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <button
        type="button"
        onClick={openGuestModal}
        className="flex flex-1 items-center gap-2"
      >
        <UserRoundPlus className="size-5 text-zinc-400" />
        {emailsToInvite.length > 0 ? (
          <span className="flex-1 text-left text-lg text-zinc-400">
            {emailsToInvite.length} pessoa
            {emailsToInvite.length > 1 ? 's' : ''} convidada
            {emailsToInvite.length > 1 ? 's' : ''}
          </span>
        ) : (
          <span className="flex-1 text-left text-lg text-zinc-400">
            Quem estará na viagem?
          </span>
        )}
      </button>

      <div className="h-6 w-px bg-zinc-800" />
      <Button onClick={openConfirmTripModal}>
        Confirmar viagem <ArrowRight className="size-5" />
      </Button>
    </div>
  )
}
