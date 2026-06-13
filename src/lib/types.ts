import type { ActiveOptions } from "@tanstack/react-router"
import type { LucideIcon } from "lucide-react"

export interface NavItem {
    to: string
    label: string
    icon: LucideIcon
    activeOptions: ActiveOptions
    /** Required when `to` includes `$param` segments (e.g. `/teams/$teamId`). */
    params?: Record<string, string>
  }