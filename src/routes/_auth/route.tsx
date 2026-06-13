import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  const date = new Date().getFullYear()

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/20 via-background to-background"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,color-mix(in_oklch,var(--primary)_30%,transparent),transparent_65%)]"
      />
      <div
        aria-hidden
        className="auth-pitch-lines pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,transparent_42%,color-mix(in_oklch,var(--primary)_6%,transparent)_50%,transparent_58%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 size-[28rem] rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 size-96 rounded-full bg-accent/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[62%] size-[min(92vw,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[62%] size-[min(52vw,18rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15 opacity-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[8%] top-[62%] h-px -translate-y-1/2 bg-linear-to-r from-transparent via-primary/25 to-transparent"
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-8 px-4 py-10">
      <Link
                to="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >              
              <img
                src={"/tisini.png"}
                alt="Tisini"
                width={105}
                height={50}
              />
            
              </Link>

        <div className="flex w-full max-w-md flex-col items-center gap-6">
          <Outlet />

          <p className="text-center text-sm text-muted-foreground">
            Copyright © {date} Tisini. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
