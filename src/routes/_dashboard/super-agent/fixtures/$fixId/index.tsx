import { createFileRoute } from '@tanstack/react-router'

import { MatchReportDownload } from '#/components/fixtures/match-report-download'
import {
  getFixturePassMatrixFn,
  getFixturePlayerStatsFn,
  getFixtureQuarterStatsFn,
  getFixtureTeamStatsFn,
} from '#/data/fixtures'

export const Route = createFileRoute(
  '/_dashboard/super-agent/fixtures/$fixId/',
)({
  loader: async ({ params: { fixId } }) => {
    const teamStats = await getFixtureTeamStatsFn({ data: { id: fixId } })
    const playerStats = await getFixturePlayerStatsFn({ data: { id: fixId } })
    const quarterStats = await getFixtureQuarterStatsFn({ data: { id: fixId } })
    const passMatrix = await getFixturePassMatrixFn({ data: { id: fixId } })

    return { teamStats, playerStats, quarterStats, passMatrix }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { teamStats, playerStats, quarterStats, passMatrix } =
    Route.useLoaderData()

  console.log(playerStats)
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">
          {teamStats.fixture.home_team} vs {teamStats.fixture.away_team}
        </h1>
        <p className="text-sm text-muted-foreground">
          Download the match report for either team.
        </p>
      </div>

      <MatchReportDownload
        teamStats={teamStats}
        playerStats={playerStats}
        quarterStats={quarterStats}
        passMatrix={passMatrix}
      />
    </div>
  )
}
