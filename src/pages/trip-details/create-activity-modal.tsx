import { Calendar, Tag, ThumbsUp, X } from 'lucide-react'
import { type FormEvent, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '../../components/button'
import { api } from '../../lib/axios'
import { useActivitiesStore } from '../../zustand-store/activities-store'

interface CreateAcitivyModalProps {
  closeCreateActivityModal: () => void
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateAcitivyModalProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const { load, refresh } = useActivitiesStore((store) => {
    return {
      load: store.load,
      refresh: store.refresh,
    }
  })

  const { tripId } = useParams()

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!tripId) {
      return
    }

    const data = new FormData(event.currentTarget)

    const title = data.get('title') as string
    const occursAt = data.get('occurs_at') as string

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at: occursAt,
    })

    if (formRef.current) {
      formRef.current.reset()
    }

    refresh(tripId)
    await load()
  }

  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button onClick={closeCreateActivityModal}>
              <X className="size-5 text-zinc-400 hover:text-zinc-300" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form ref={formRef} onSubmit={createActivity} className="space-y-3">
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <Tag className="size-5 text-zinc-400" />
            <input
              name="title"
              placeholder="Qual a atividade?"
              className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
              <Calendar className="size-5 text-zinc-400" />
              <input
                type="datetime-local"
                name="occurs_at"
                placeholder="Data e horário da atividade"
                className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              />
            </div>
          </div>
          <Button type="submit" variant="primary" size="full">
            Salvar atividade <ThumbsUp className="size-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
