import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CircleCheck } from 'lucide-react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useActivitiesStore } from '../../zustand-store/activities-store'

export function Activities() {
  const { tripId } = useParams()
  const { load, refresh, activities } = useActivitiesStore((store) => {
    return {
      load: store.load,
      refresh: store.refresh,
      activities: store.activities,
    }
  })

  useEffect(() => {
    if (!tripId) {
      return
    }
    refresh(tripId)
    load()
  }, [load, refresh, tripId])

  return (
    <div className="space-y-8">
      {activities &&
        activities.map((category) => {
          return (
            <div key={category.date} className="space-y-2.5">
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-semibold text-zinc-300">
                  Dia{' '}
                  {format(category.date, 'dd/MM', {
                    locale: ptBR,
                  })}
                </span>
                <span className="text-xs text-zinc-500">
                  {format(category.date, 'EEEE', {
                    locale: ptBR,
                  })}
                </span>
              </div>

              {category.activities.length > 0 ? (
                <div>
                  {category.activities.map((activity) => {
                    return (
                      <div key={activity.id} className="space-y-2.5">
                        <div className="flex items-center gap-3 rounded-xl bg-zinc-900 px-4 py-2.5 shadow-shape">
                          <CircleCheck className="size-5 text-lime-300" />
                          <span className="text-zinc-100">
                            {activity.title}
                          </span>
                          <span className="ml-auto text-sm text-zinc-400">
                            {format(activity.occurs_at, "HH'h'mm'min'", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-zinc-500">
                  Nenhuma atividade cadastrada nessa data.
                </p>
              )}
            </div>
          )
        })}
    </div>
  )
}
