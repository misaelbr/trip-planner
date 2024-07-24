import { Link2, Link2Off, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '../../components/button'
import { useLinksStore } from '../../zustand-store/links-store'
import { CreateLinkModal } from './create-link-modal'

export function ImportantLinks() {
  const { tripId } = useParams()

  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)

  const { load, refresh, links } = useLinksStore((store) => {
    return {
      load: store.load,
      refresh: store.refresh,
      links: store.links,
    }
  })

  useEffect(() => {
    if (!tripId) {
      return
    }
    refresh(tripId)
    load()
  }, [load, refresh, tripId])

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true)
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links importantes</h2>
      <div className="space-y-5">
        {links && links.length > 0 ? (
          links.map((link) => {
            return (
              <div
                key={link.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">
                    {link.title}
                  </span>
                  <a
                    href={link.url}
                    className="block truncate text-xs font-medium text-zinc-400 hover:text-zinc-200"
                  >
                    {link.url}
                  </a>
                </div>
                <Link2 className="size-5 shrink-0 text-zinc-400" />
              </div>
            )
          })
        ) : (
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                Sem links cadastrados
              </span>
            </div>
            <Link2Off className="size-5 shrink-0 text-zinc-400" />
          </div>
        )}
      </div>
      <Button onClick={openCreateLinkModal} variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
      {isCreateLinkModalOpen && (
        <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />
      )}
    </div>
  )
}
