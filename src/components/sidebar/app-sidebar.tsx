import {
  AudioLinesIcon,
  BookOpenIcon,
  BotIcon,
  CalendarIcon,
  FrameIcon,
  GalleryVerticalEndIcon,
  HomeIcon,
  InfoIcon,
  MapIcon,
  PieChartIcon,
  Settings2Icon,
  TerminalIcon,
  TerminalSquareIcon,
  UserCheckIcon,
  Users2Icon,
  UsersIcon,
} from "lucide-react"
// import { linkOptions, useParams } from "@tanstack/react-router"
// import { useMemo } from "react"
// import type { NavItem, User } from "@/lib/types"
// import { toTeamRouteId } from "@/lib/utils"
// import { NavPrimary } from "@/components/sidebar/nav-primary"
import { NavUser } from "@/components/sidebar/nav-user"
import { TeamSwitcher } from "@/components/sidebar/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
// import { NavMain } from "./nav-main"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: <GalleryVerticalEndIcon />,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: <AudioLinesIcon />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <TerminalIcon />,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: <TerminalSquareIcon />,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: <BotIcon />,
    },
    {
      title: "Documentation",
      url: "#",
      icon: <BookOpenIcon />,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: <FrameIcon />,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: <PieChartIcon />,
    },
    {
      name: "Travel",
      url: "#",
      icon: <MapIcon />,
    },
  ],
}

// function useTeamNavItems(): Array<NavItem> {
//   const { teamId: teamIdParam } = useParams({ strict: false })
//   const fallbackTeamId = teams[0] ? toTeamRouteId(teams[0]) : undefined
//   const teamId = teamIdParam ?? fallbackTeamId

//   return useMemo(() => {
//     if (!teamId) {
//       return linkOptions([
//         {
//           to: "/teams",
//           label: "Teams",
//           icon: HomeIcon,
//           activeOptions: { exact: true },
//         },
//       ])
//     }

//     return linkOptions([
//       {
//         to: "/teams/$teamId",
//         params: { teamId },
//         label: "Home",
//         icon: HomeIcon,
//         activeOptions: { exact: true },
//       },
//       {
//         to: "/teams",
//         label: "Teams",
//         icon: UsersIcon,
//         activeOptions: { exact: true },
//       },
//       {
//         to: "/teams/$teamId/players",
//         params: { teamId },
//         label: "Players",
//         icon: Users2Icon,
//         activeOptions: { exact: true },
//       },
//       {
//         to: "/teams/$teamId/sessions",
//         params: { teamId },
//         label: "Sessions",
//         icon: CalendarIcon,
//         activeOptions: { exact: true },
//       },
//       {
//         to: "/teams/$teamId/attendance",
//         params: { teamId },
//         label: "Attendance",
//         icon: UserCheckIcon,
//         activeOptions: { exact: true },
//       },
//     ])
//   }, [teamId])
// }

export function AppSidebar() {


  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavPrimary items={navItems} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
