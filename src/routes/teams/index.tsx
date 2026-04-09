import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teams/')({
  component: TeamsPage,
})

function TeamsPage() {
  return <main>Teams Home</main>
}
