import { cx, css } from '../styled-system/css'
import { container } from '../lib/frame'

export function ShowcaseFooter({ label }: { label: string }) {
  return (
    <footer
      className={css({
        position: 'relative',
        zIndex: '1',
        borderTop: '1px solid',
        borderColor: 'color-mix(in oklab, {colors.frame.ink} 12%, transparent)',
        paddingBlock: '6',
      })}
    >
      <div
        className={cx(
          container,
          css({
            display: 'flex',
            flexWrap: 'wrap',
            gap: '3',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '13px',
            color: 'frame.muted',
          }),
        )}
      >
        <span className={css({ display: 'flex', alignItems: 'center', gap: '2.5' })}>
          <img src="/panda-p.svg" alt="" className={css({ height: '20px', width: '20px' })} />
          {label}
        </span>
        <span>Panda CSS v2 · shadcn</span>
      </div>
    </footer>
  )
}
