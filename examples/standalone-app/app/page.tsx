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
        kicker="Panda CSS · Design system starter"
        title="A design system, no Panda in your app"
        subtitle="This Next.js app has no Panda installed. It uses the published design system — one CSS import and the React components."
      />
      <ShowcaseGallery />
      <ShowcaseFooter label="Standalone app" />
    </div>
  )
}
