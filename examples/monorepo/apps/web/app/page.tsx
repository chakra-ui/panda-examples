import { cx, css } from '../styled-system/css'
import { page, container } from '../lib/frame'
import { ThemeToggle } from '../components/theme-toggle'
import { ShowcaseHero } from '../components/showcase-hero'
import { ShowcaseGallery } from '../components/showcase-gallery'
import { ShowcaseFooter } from '../components/showcase-footer'

export default function Home() {
  return (
    <div className={page}>
      <div
        className={css({
          position: 'sticky',
          top: '0',
          zIndex: '10',
          backdropFilter: 'blur(8px)',
          backgroundColor: 'color-mix(in oklab, {colors.frame.canvas} 78%, transparent)',
          borderBottom: '1px solid',
          borderColor: 'color-mix(in oklab, {colors.frame.ink} 8%, transparent)',
        })}
      >
        <div
          className={cx(
            container,
            css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBlock: '3',
            }),
          )}
        >
          <span
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: '2.5',
              fontFamily: 'display',
              fontWeight: 'bold',
              fontSize: '15px',
              color: 'frame.ink',
            })}
          >
            <img src="/panda-p.svg" alt="" className={css({ height: '22px', width: '22px' })} />
            shadcn × Panda
          </span>
          <ThemeToggle />
        </div>
      </div>

      <ShowcaseHero
        kicker="Panda CSS · Design system starter"
        title="Design system in a monorepo"
        subtitle="One shadcn/ui design system, built with Panda's `panda lib`, shared across every app in a pnpm + Turborepo workspace. Decide once, use everywhere."
      />
      <ShowcaseGallery />
      <ShowcaseFooter label="Design system monorepo" />
    </div>
  )
}
