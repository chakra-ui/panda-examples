import { css } from '../styled-system/css'

export const page = css({
  minHeight: '100dvh',
  backgroundColor: 'frame.canvas',
  color: 'frame.ink',
  fontFamily: 'body',
  position: 'relative',
  overflowX: 'hidden',
})

export const container = css({
  width: '100%',
  maxWidth: '1120px',
  marginInline: 'auto',
  paddingInline: { base: '5', md: '8' },
})

export const glow = css({
  position: 'absolute',
  top: '-280px',
  right: '-160px',
  width: '760px',
  height: '760px',
  pointerEvents: 'none',
  zIndex: '0',
  background:
    'radial-gradient(closest-side, color-mix(in oklab, var(--colors-frame-brand) 32%, transparent), transparent)',
  filter: 'blur(8px)',
})

export const eyebrow = css({
  display: 'inline-block',
  fontSize: '12px',
  fontWeight: 'bold',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'frame.eyebrow',
})

export const display = css({
  fontFamily: 'display',
  fontWeight: 'bold',
  letterSpacing: '-0.02em',
  lineHeight: '1.02',
  color: 'frame.ink',
})

export const muted = css({ color: 'frame.muted' })

export const sectionCard = css({
  position: 'relative',
  zIndex: '1',
  backgroundColor: 'frame.card',
  borderRadius: '20px',
  padding: { base: '6', md: '8' },
})

export const sectionLabel = css({
  fontSize: '11px',
  fontWeight: 'bold',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: 'frame.muted',
  marginBottom: '5',
})

export const row = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '3',
})
