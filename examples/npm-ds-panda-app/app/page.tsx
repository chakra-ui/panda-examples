import { cx, css } from '../styled-system/css'
import { page, container } from '../lib/frame'
import { ThemeToggle } from '../components/theme-toggle'
import { ShowcaseHero } from '../components/showcase-hero'
import { ShowcaseExtend } from '../components/showcase-extend'
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
        kicker="Panda CSS v2 · Design System Starter"
        title="npm design system, your own Panda"
        subtitle="This app runs Panda and pulls the shadcn design system from npm through `designSystem`. It reuses every token and recipe, and adds its own on top — no fork."
      />
      <main
        className={cx(
          container,
          css({ display: 'flex', flexDirection: 'column', gap: '5', paddingBottom: '5' }),
        )}
      >
        <ShowcaseExtend />
      </main>
      <ShowcaseGallery />
      <ShowcaseFooter label="npm DS · Panda app" />
    </div>
  )
}
