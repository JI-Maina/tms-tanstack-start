import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  component: AdminPage,
})

function AdminPage() {
  return <main>Admin Home</main>
}
