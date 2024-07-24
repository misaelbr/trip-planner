import { create } from 'zustand'

import { api } from '../lib/axios'

export interface Link {
  id: string
  title: string
  url: string
}

export interface LinksState {
  links: Link[] | null
  tripId: string | null
  refresh: (tripId: string) => void
  load: () => Promise<void>
}

export const useLinksStore = create<LinksState>((set, get) => {
  return {
    links: null,
    tripId: null, // Adicione esta linha
    refresh: (tripId: string) => {
      set({ tripId })
    },
    load: async () => {
      const { tripId } = get()

      if (!tripId) {
        console.error('tripId é null, não pode carregar atividades.')
        return
      }

      const response = await api.get(`/trips/${tripId}/links`)
      const { links } = response.data
      set({ links })
    },
  }
})
