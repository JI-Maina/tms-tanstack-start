import { createFileRoute } from '@tanstack/react-router'
import HeroSection from '@/components/site/hero-section'

export const Route = createFileRoute('/_landing/')({ component: App })

function App() {
  return <main className="">
    <HeroSection />
  </main>
}
