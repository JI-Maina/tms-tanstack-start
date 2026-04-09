import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const SUBDOMAINS = ['teams', 'competitions', 'admin', 'tickets', 'players'] as const
const SUBDOMAIN_SET = new Set<string>(SUBDOMAINS)
const PRODUCTION_DOMAIN = 'tisini.africa'

function getMappedSubdomain(hostname: string) {
  const normalizedHost = hostname.toLowerCase()

  if (
    normalizedHost === PRODUCTION_DOMAIN ||
    normalizedHost === `www.${PRODUCTION_DOMAIN}` ||
    normalizedHost === 'localhost'
  ) {
    return null
  }

  if (normalizedHost.endsWith(`.${PRODUCTION_DOMAIN}`)) {
    const leftPart = normalizedHost.slice(0, -(`.${PRODUCTION_DOMAIN}`.length))
    if (leftPart.includes('.')) return null
    return SUBDOMAIN_SET.has(leftPart) ? leftPart : null
  }

  if (normalizedHost.endsWith('.localhost')) {
    const leftPart = normalizedHost.slice(0, -('.localhost'.length))
    if (!leftPart || leftPart.includes('.')) return null
    return SUBDOMAIN_SET.has(leftPart) ? leftPart : null
  }

  return null
}

function startsWithPrefix(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`)
}

function stripPrefix(pathname: string, prefix: string) {
  const stripped = pathname.slice(prefix.length)
  return stripped || '/'
}

function toSubdomainHost(currentHost: string, subdomain: string) {
  const normalizedHost = currentHost.toLowerCase()
  if (normalizedHost.endsWith('.localhost') || normalizedHost === 'localhost') {
    return `${subdomain}.localhost`
  }
  return `${subdomain}.${PRODUCTION_DOMAIN}`
}

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    rewrite: {
      input: ({ url }) => {
        const subdomain = getMappedSubdomain(url.hostname)
        if (!subdomain) return url

        const prefix = `/${subdomain}`
        if (startsWithPrefix(url.pathname, prefix)) return url

        url.pathname = url.pathname === '/' ? prefix : `${prefix}${url.pathname}`
        return url
      },
      output: ({ url }) => {
        for (const subdomain of SUBDOMAINS) {
          const prefix = `/${subdomain}`
          if (!startsWithPrefix(url.pathname, prefix)) continue

          url.hostname = toSubdomainHost(url.hostname, subdomain)
          url.pathname = stripPrefix(url.pathname, prefix)
          return url
        }

        return url
      },
    },
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
