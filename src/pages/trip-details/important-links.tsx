import { Link2, Plus } from 'lucide-react'

import { Button } from '../../components/button'

export function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links importantes</h2>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Reserva AirBnB
            </span>
            <a
              href="#"
              className="block truncate text-xs font-medium text-zinc-400 hover:text-zinc-200"
            >
              https://airbnb.com/rooms/123545454545454456hhhhhh
            </a>
          </div>
          <Link2 className="size-5 shrink-0 text-zinc-400" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Reserva AirBnB
            </span>
            <a
              href="#"
              className="block truncate text-xs font-medium text-zinc-400 hover:text-zinc-200"
            >
              https://airbnb.com/rooms/123545454545454456hhhhhh
            </a>
          </div>
          <Link2 className="size-5 shrink-0 text-zinc-400" />
        </div>
      </div>
      <Button variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  )
}
