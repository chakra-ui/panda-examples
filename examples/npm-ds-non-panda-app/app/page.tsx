import { ThemeToggle } from '../components/theme-toggle'
import { ShowcaseHero } from '../components/showcase-hero'
import { ShowcaseGallery } from '../components/showcase-gallery'
import { ShowcaseFooter } from '../components/showcase-footer'

export default function Home() {
  return (
    <div className="frame-page">
      <div className="frame-header">
        <div className="frame-container frame-header-inner">
          <span className="frame-wordmark">
            <img src="/panda-p.svg" alt="" style={{ height: 22, width: 22 }} />
            shadcn × Panda
          </span>
          <ThemeToggle />
        </div>
      </div>

      <ShowcaseHero
        kicker="Panda CSS v2 · Design System Starter"
        title="npm design system, no Panda in the app"
        subtitle="This Next.js app has no Panda installed. It pulls the shadcn design system from npm, imports one CSS file, and renders the React components."
      />
      <ShowcaseGallery />
      <ShowcaseFooter label="npm DS · non-Panda app" />
    </div>
  )
}
