import { useEffect, useMemo, useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { DownloadIcon } from 'lucide-react'

import { MatchReportPDF } from '#/components/pdf-reports/match-report-pdf'
import type { ReportTeam } from '#/components/pdf-reports/pdf-types'
import {
  getPlayerQuarterAverage,
  getPlayerQuarterCharts,
  getTeamName,
} from '#/components/pdf-reports/transform-report-data'
import { Button } from '#/components/ui/button'
import { usePlayerCharts } from '#/hooks/use-player-charts'
import { useTeamCharts } from '#/hooks/use-team-charts'
import {
  toAverageQuarterStats,
  toPlayerQuarterStat,
} from '#/lib/charts/player-quarter-adapters'
import { getTeamQuarterStatsForCharts } from '#/lib/charts/team-quarter-adapters'
import type { TeamChartImages } from '#/lib/charts/team-quarter-types'
import type {
  FixturePassMatrix,
  FixturePlayerStats,
  FixtureQuarterStats,
  FixtureTeamStats,
} from '#/lib/types'

interface MatchReportDownloadProps {
  teamStats: FixtureTeamStats
  playerStats: FixturePlayerStats[]
  quarterStats: FixtureQuarterStats
  passMatrix: FixturePassMatrix
}

function ReportDownloadButton({
  team,
  teamStats,
  playerStats,
  quarterStats,
  passMatrix,
}: MatchReportDownloadProps & { team: ReportTeam }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const teamQuarterStats = useMemo(
    () =>
      isClient ? getTeamQuarterStatsForCharts(quarterStats, team) : {},
    [isClient, quarterStats, team],
  )

  const playerQuarterStats = useMemo(
    () =>
      isClient
        ? getPlayerQuarterCharts(quarterStats, team).map(toPlayerQuarterStat)
        : [],
    [isClient, quarterStats, team],
  )

  const averageQuarterStats = useMemo(
    () =>
      isClient
        ? toAverageQuarterStats(getPlayerQuarterAverage(quarterStats, team))
        : ({} as ReturnType<typeof toAverageQuarterStats>),
    [isClient, quarterStats, team],
  )

  const { teamCharts, isGeneratingChart } = useTeamCharts(teamQuarterStats)
  const { playerCharts, isGeneratingPlayerCharts } = usePlayerCharts(
    playerQuarterStats,
    averageQuarterStats,
  )

  const teamName = getTeamName(teamStats, team)
  const fileName = `${teamName.replace(/\s+/g, '_')}_match_report.pdf`

  const isTeamChartsReady =
    Boolean(teamCharts.shots) &&
    Boolean(teamCharts.chances) &&
    Boolean(teamCharts.defense) &&
    Boolean(teamCharts.possession)

  if (
    !isClient ||
    isGeneratingChart ||
    isGeneratingPlayerCharts ||
    !isTeamChartsReady
  ) {
    return (
      <Button variant="outline" disabled>
        <DownloadIcon size={16} />
        {teamName} report
      </Button>
    )
  }

  return (
    <PDFDownloadLink
      document={
        <MatchReportPDF
          teamStats={teamStats}
          playerStats={playerStats}
          passMatrix={passMatrix}
          team={team}
          teamCharts={teamCharts as TeamChartImages}
          playerCharts={playerCharts}
        />
      }
      fileName={fileName}
      style={{ textDecoration: 'none' }}
    >
      {({ loading }) => (
        <Button variant="outline" disabled={loading}>
          <DownloadIcon size={16} />
          {loading ? 'Preparing...' : `${teamName} report`}
        </Button>
      )}
    </PDFDownloadLink>
  )
}

export function MatchReportDownload(props: MatchReportDownloadProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <ReportDownloadButton {...props} team="home" />
      <ReportDownloadButton {...props} team="away" />
    </div>
  )
}
