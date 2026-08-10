import { cx, css } from '../styled-system/css'
import { container, glow, eyebrow, display } from '../lib/frame'

export function ShowcaseHero({
  kicker,
  title,
  subtitle,
}: {
  kicker: string
  title: string
  subtitle: string
}) {
  return (
    <header
      className={css({
        position: 'relative',
        paddingTop: { base: '14', md: '24' },
        paddingBottom: { base: '10', md: '16' },
      })}
    >
      <div className={glow} />
      <div className={cx(container, css({ position: 'relative', zIndex: '1' }))}>
        <img
          src="/logo-main.svg"
          alt="Panda CSS"
          className={css({
            height: '30px',
            width: 'auto',
            marginBottom: '9',
            _dark: { display: 'none' },
          })}
        />
        <img
          src="/logo-dark.svg"
          alt="Panda CSS"
          className={css({
            height: '30px',
            width: 'auto',
            marginBottom: '9',
            display: 'none',
            _dark: { display: 'block' },
          })}
        />
        <span className={eyebrow}>{kicker}</span>
        <h1
          className={cx(
            display,
            css({
              fontSize: { base: '42px', md: '68px' },
              marginTop: '4',
              maxWidth: '18ch',
            }),
          )}
        >
          {title}
        </h1>
        <p
          className={css({
            marginTop: '5',
            maxWidth: '52ch',
            fontSize: { base: '16px', md: '18px' },
            lineHeight: '1.6',
            color: 'frame.muted',
          })}
        >
          {subtitle}
        </p>
      </div>
    </header>
  )
}
