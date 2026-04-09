import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/competitions/')({
  component: CompetitionsPage,
})

function CompetitionsPage() {
  return <main>Competitions Home</main>
}
