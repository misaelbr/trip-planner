import { create } from 'zustand'

import { api } from '../lib/axios'

export interface Activity {
  date: string
  activities: {
    id: string
    title: string
    occurs_at: string
  }[]
}

export interface ActivitiesState {
  activities: Activity[] | null
  tripId: null | string
  refresh: (tripId: string) => void
  load: () => Promise<void>
}

export const useActivitiesStore = create<ActivitiesState>((set, get) => {
  return {
    activities: null,
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

      const response = await api.get(`/trips/${tripId}/activities`)
      const { activities } = response.data
      set({ activities })
    },
  }
})
