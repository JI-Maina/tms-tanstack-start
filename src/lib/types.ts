import type { ActiveOptions } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
  to: string
  label: string
  icon: LucideIcon
  activeOptions: ActiveOptions
}

export interface Module {
  name: string
  logo: React.ReactNode
  plan: string
  url: string
}

export interface User {
  id: number
  name: string
  email: string
  phone: string
}
