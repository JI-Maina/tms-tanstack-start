import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_landing/about')({
  component: About,
})

function About() {
  return <main className="">About</main>
}
