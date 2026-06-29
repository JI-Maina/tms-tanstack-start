import { apiService } from '#/lib/api'
import { authFnMiddleware } from '#/middlewares/auth'
import { createServerFn } from '@tanstack/react-start'
import type {
  Fixture,
  FixturePlayerStats,
  FixtureTeamStats,
  FixtureQuarterStats,
  PaginatedResponse,
  FixturePassMatrix,
} from '#/lib/types'

export const getFixturesFn = createServerFn({ method: 'GET' })
  .middleware([authFnMiddleware])
  .handler(async () => {
    const fixtures =
      await apiService.get<PaginatedResponse<Fixture>>('/fixtures')

    return fixtures
  })

export const getFixtureTeamStatsFn = createServerFn({ method: 'GET' })
  .middleware([authFnMiddleware])
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const teamStats = await apiService.get<FixtureTeamStats>(
      `/fixtures/${data.id}/team-stats`,
    )
    return teamStats
  })

export const getFixturePlayerStatsFn = createServerFn({ method: 'GET' })
  .middleware([authFnMiddleware])
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const playerStats = await apiService.get<FixturePlayerStats[]>(
      `/fixtures/${data.id}/player-stats`,
    )
    return playerStats
  })

export const getFixtureQuarterStatsFn = createServerFn({ method: 'GET' })
  .middleware([authFnMiddleware])
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const quarterStats = await apiService.get<FixtureQuarterStats>(
      `/fixtures/${data.id}/quarter-stats`,
    )
    return quarterStats
  })

export const getFixturePassMatrixFn = createServerFn({ method: 'GET' })
  .middleware([authFnMiddleware])
  .validator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const passMatrix = await apiService.get<FixturePassMatrix>(
      `/fixtures/${data.id}/pass-matrix`,
    )
    return passMatrix
  })
