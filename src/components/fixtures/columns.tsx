import type { Fixture } from '#/lib/types'
import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '../ui/button'
import { Link } from '@tanstack/react-router'

export const columns: ColumnDef<Fixture>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'home_team.name',
    header: 'Home Team',
  },
  {
    accessorKey: 'away_team.name',
    header: 'Away Team',
  },
  {
    accessorKey: 'match_type.type_name',
    header: 'Match Type',
  },
  {
    accessorKey: 'competition.name',
    header: 'Competition',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const fixture = row.original

      return (
        <Button variant="outline" asChild>
          <Link
            to={`/super-agent/fixtures/$fixId`}
            params={{ fixId: fixture.id.toString() }}
          >
            More
          </Link>
        </Button>
      )
    },
  },
]
