import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizePath(pathname: string) {
  if (pathname === '/') return '/'
  return pathname.replace(/\/$/, '')
}

export function safeInternalPath(
  path: string | undefined,
  fallback = '/super-agent',
) {
  if (!path || !path.startsWith('/') || path.startsWith('//')) {
    return fallback
  }
  return path
}

export function getPercent(total: number, stat: number) {
  if (total === 0) {
    return 0
  }

  return Math.round((stat / total) * 100)
}
