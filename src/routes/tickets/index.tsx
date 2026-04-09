import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tickets/')({
  component: TicketsPage,
})

function TicketsPage() {
  return <main>Tickets Home</main>
}
