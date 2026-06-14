import { Link } from '@tanstack/react-router'
import type { NavItem } from '#/lib/types'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '#/components/ui/sidebar'

interface NavPrimaryProps {
  items: Array<NavItem>
}

export function NavPrimary({ items }: NavPrimaryProps) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.icon

          return (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton asChild size="sm">
                <Link
                  to={item.to}
                  activeOptions={item.activeOptions}
                  activeProps={{
                    'data-active': true,
                  }}
                >
                  <Icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
