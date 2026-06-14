import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/super-agent/teams/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_dashboard/super-agent/teams/"!</div>
}
