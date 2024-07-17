import { endOfDay } from 'date-fns'
import { type FormEvent, useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { useNavigate } from 'react-router-dom'

import { api } from '../../lib/axios'
import { ConfirmTripModal } from './confirm-trip-modal'
import { InviteGuestModal } from './invite-guests-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestStep } from './steps/invite-guest-step'

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestInputOpen, setIsGuestInputOpen] = useState(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false)

  const [destination, setDestination] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [onwnerEmail, setOwnerEmail] = useState('')
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >()

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

  function openGuestInput() {
    setIsGuestInputOpen(true)
  }

  function closedGuestInput() {
    setIsGuestInputOpen(false)
  }

  function openGuestModal() {
    setIsGuestModalOpen(true)
  }

  function closeGuestModal() {
    setIsGuestModalOpen(false)
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true)
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const email = data.get('email') as string

    if (!email) {
      return
    }

    if (emailsToInvite.includes(email)) {
      return
    }

    setEmailsToInvite([...emailsToInvite, email])

    event.currentTarget.reset()
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (invited) => invited !== emailToRemove,
    )

    setEmailsToInvite(newEmailList)
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    console.log(destination)
    console.log(eventStartAndEndDates)
    console.log(ownerName)
    console.log(onwnerEmail)

    if (!destination) {
      return
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }

    if (emailsToInvite.length === 0) {
      return
    }

    if (!ownerName || !onwnerEmail) {
      return
    }

    const response = await api.post('/trips', {
      destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: endOfDay(eventStartAndEndDates.to),
      emails_to_invite: emailsToInvite,
      owner_name: ownerName.trim(),
      owner_email: onwnerEmail.trim(),
    })

    const { tripId } = response.data

    navigate(`/trips/${tripId}`)
  }

  return (
    <div className="flex h-screen items-center justify-center bg-pattern bg-center bg-no-repeat">
      <div className="w-full max-w-3xl space-y-10 px-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-lg text-zinc-300">
            Convide seus amigos e planeje sua próxima viagem
          </p>
        </div>
        <div className="space-y-4">
          <DestinationAndDateStep
            isGuestInputOpen={isGuestInputOpen}
            openGuestInput={openGuestInput}
            closedGuestInput={closedGuestInput}
            setDestination={setDestination}
            setEventStartAndEndDates={setEventStartAndEndDates}
            eventStartAndEndDates={eventStartAndEndDates}
          />
          {isGuestInputOpen && (
            <InviteGuestStep
              emailsToInvite={emailsToInvite}
              openGuestModal={openGuestModal}
              openConfirmTripModal={openConfirmTripModal}
            />
          )}
        </div>
        <p className="text-sm text-zinc-500">
          Ao planejar seu plann.er você automaticamente concorda
          <br /> com nossos{' '}
          <a className="texzin300 underline" href="#">
            termos de uso
          </a>{' '}
          e{' '}
          <a className="texzin300 underline" href="#">
            políticas de privacidade
          </a>
          .
        </p>
      </div>
      {isGuestModalOpen && (
        <InviteGuestModal
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestModal={closeGuestModal}
          emailsToInvite={emailsToInvite}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
          setDetails={{
            destination,
            dates: {
              starts_at: eventStartAndEndDates?.from || '',
              ends_at: eventStartAndEndDates?.to || '',
            },
          }}
        />
      )}
    </div>
  )
}
