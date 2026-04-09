import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/players/')({
  component: PlayersPage,
})

function PlayersPage() {
  return <main>Players Home</main>
}
