import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/agent/fixtures')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_dashboard/agent/fixtures"!</div>
}
