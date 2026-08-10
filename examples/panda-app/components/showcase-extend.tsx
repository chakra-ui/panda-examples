import { css, cx } from '../styled-system/css'
import { sectionCard, sectionLabel } from '../lib/frame'

const swatch = css({
  width: '14',
  height: '14',
  borderRadius: '12px',
  border: '1px solid',
  borderColor: 'border',
})

export function ShowcaseExtend() {
  return (
    <section className={sectionCard}>
      <p className={sectionLabel}>Extend, don't fork</p>
      <p
        className={css({
          fontSize: '15px',
          lineHeight: '1.6',
          color: 'frame.muted',
          maxWidth: '60ch',
          marginBottom: '5',
        })}
      >
        This app adds one token, <code>colors.brand</code>, in its own{' '}
        <code>panda.config.ts</code>. It sits right next to the design system's tokens — same
        system, no fork. The swatch on the right is the app's; the one on the left ships from the
        design system.
      </p>
      <div className={css({ display: 'flex', gap: '6', alignItems: 'center' })}>
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '2', alignItems: 'center' })}>
          <div className={cx(swatch, css({ backgroundColor: 'primary' }))} />
          <span className={css({ fontSize: '12px', color: 'frame.muted' })}>primary · DS</span>
        </div>
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '2', alignItems: 'center' })}>
          <div className={cx(swatch, css({ backgroundColor: 'brand' }))} />
          <span className={css({ fontSize: '12px', color: 'frame.muted' })}>brand · this app</span>
        </div>
      </div>
    </section>
  )
}
