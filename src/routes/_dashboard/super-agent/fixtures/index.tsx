import { createFileRoute } from '@tanstack/react-router'
import { getFixturesFn } from '#/data/fixtures'
import { DataTable } from '#/components/fixtures/fixtures-table'
import { columns } from '#/components/fixtures/columns'

export const Route = createFileRoute('/_dashboard/super-agent/fixtures/')({
  loader: async () => {
    const fixtures = await getFixturesFn()

    return { fixtures }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { fixtures } = Route.useLoaderData()

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={fixtures.results} />
    </div>
  )
}
