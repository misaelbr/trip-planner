import { Link2, Tag, ThumbsUp, X } from 'lucide-react'
import { type FormEvent, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '../../components/button'
import { api } from '../../lib/axios'
import { useLinksStore } from '../../zustand-store/links-store'

interface CloseCreateLinkModalProps {
  closeCreateLinkModal: () => void
}

export function CreateLinkModal({
  closeCreateLinkModal,
}: CloseCreateLinkModalProps) {
  const { tripId } = useParams()
  const { load, refresh } = useLinksStore((store) => {
    return {
      load: store.load,
      refresh: store.refresh,
    }
  })

  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!tripId) {
      return
    }

    const data = new FormData(event.currentTarget)

    const title = data.get('link_title') as string
    const url = data.get('link_url') as string

    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    })

    refresh(tripId)
    await load()
  }

  useEffect(() => {
    if (!tripId) {
      return
    }
    refresh(tripId)
    load()
  }, [load, refresh, tripId])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[540px] space-y-5 rounded-xl bg-zinc-900 px-6 py-6 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar link</h2>
            <button onClick={closeCreateLinkModal}>
              <X className="size-5 text-zinc-400 hover:text-zinc-300" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem cadastrar links.
          </p>
        </div>
        <form onSubmit={createLink} className="space-y-3">
          <div className="flex h-14 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
            <Tag className="size-5 text-zinc-400" />
            <input
              name="link_title"
              placeholder="Título do link"
              className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-4">
              <Link2 className="size-5 text-zinc-400" />
              <input
                name="link_url"
                placeholder="URL"
                className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
              />
            </div>
          </div>
          <Button type="submit" variant="primary" size="full">
            Salvar Link <ThumbsUp className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
