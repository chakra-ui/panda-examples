import { defineRecipe, defineSlotRecipe } from '@pandacss/dev'

const alpha = (varName: string, pct: number) =>
  `color-mix(in oklab, var(${varName}) ${pct}%, transparent)`

const focusRing = {
  outline: 'none',
  _focusVisible: {
    borderColor: 'ring',
    boxShadow: '0 0 0 3px {colors.ring}',
  },
}

export const button = defineRecipe({
  className: 'btn',
  jsx: ['Button'],
  base: {
    display: 'inline-flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2',
    borderRadius: 'md',
    fontSize: 'sm',
    fontWeight: 'medium',
    whiteSpace: 'nowrap',
    transition: 'all 0.15s',
    cursor: 'pointer',
    ...focusRing,
    _disabled: { pointerEvents: 'none', opacity: 0.5 },
    '& svg': { pointerEvents: 'none', flexShrink: 0, width: '1rem', height: '1rem' },
  },
  variants: {
    variant: {
      default: {
        bg: 'primary',
        color: 'primary.foreground',
        _hover: { bg: alpha('--colors-primary', 90) },
      },
      destructive: {
        bg: 'destructive',
        color: 'white',
        _hover: { bg: alpha('--colors-destructive', 90) },
      },
      outline: {
        borderWidth: '1px',
        borderColor: 'border',
        bg: 'background',
        boxShadow: 'xs',
        _hover: { bg: 'accent', color: 'accent.foreground' },
      },
      secondary: {
        bg: 'secondary',
        color: 'secondary.foreground',
        _hover: { bg: alpha('--colors-secondary', 80) },
      },
      ghost: {
        _hover: { bg: 'accent', color: 'accent.foreground' },
      },
      link: {
        color: 'primary',
        textUnderlineOffset: '4px',
        _hover: { textDecoration: 'underline' },
      },
    },
    size: {
      default: { height: '9', paddingInline: '4', paddingBlock: '2' },
      sm: { height: '8', borderRadius: 'md', gap: '1.5', paddingInline: '3' },
      lg: { height: '10', borderRadius: 'md', paddingInline: '6' },
      icon: { width: '9', height: '9' },
    },
  },
  defaultVariants: { variant: 'default', size: 'default' },
})

export const badge = defineRecipe({
  className: 'badge',
  jsx: ['Badge'],
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'md',
    borderWidth: '1px',
    paddingInline: '2',
    paddingBlock: '0.5',
    fontSize: 'xs',
    fontWeight: 'medium',
    whiteSpace: 'nowrap',
    width: 'fit-content',
    gap: '1',
    '& svg': { width: '0.75rem', height: '0.75rem', pointerEvents: 'none' },
  },
  variants: {
    variant: {
      default: { borderColor: 'transparent', bg: 'primary', color: 'primary.foreground' },
      secondary: { borderColor: 'transparent', bg: 'secondary', color: 'secondary.foreground' },
      destructive: { borderColor: 'transparent', bg: 'destructive', color: 'white' },
      outline: { color: 'foreground' },
    },
  },
  defaultVariants: { variant: 'default' },
})

export const input = defineRecipe({
  className: 'input',
  jsx: ['Input'],
  base: {
    display: 'flex',
    height: '9',
    width: '100%',
    minWidth: '0',
    borderRadius: 'md',
    borderWidth: '1px',
    borderColor: 'input',
    bg: 'transparent',
    paddingInline: '3',
    paddingBlock: '1',
    fontSize: 'sm',
    boxShadow: 'xs',
    transition: 'color 0.15s, box-shadow 0.15s',
    _placeholder: { color: 'muted.foreground' },
    _focusVisible: { borderColor: 'ring', boxShadow: '0 0 0 3px {colors.ring}' },
    _disabled: { pointerEvents: 'none', cursor: 'not-allowed', opacity: 0.5 },
  },
})

export const textarea = defineRecipe({
  className: 'textarea',
  jsx: ['Textarea'],
  base: {
    display: 'flex',
    minHeight: '16',
    width: '100%',
    borderRadius: 'md',
    borderWidth: '1px',
    borderColor: 'input',
    bg: 'transparent',
    paddingInline: '3',
    paddingBlock: '2',
    fontSize: 'sm',
    boxShadow: 'xs',
    transition: 'color 0.15s, box-shadow 0.15s',
    _placeholder: { color: 'muted.foreground' },
    _focusVisible: { borderColor: 'ring', boxShadow: '0 0 0 3px {colors.ring}' },
    _disabled: { pointerEvents: 'none', cursor: 'not-allowed', opacity: 0.5 },
  },
})

export const label = defineRecipe({
  className: 'label',
  jsx: ['Label'],
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '2',
    fontSize: 'sm',
    fontWeight: 'medium',
    lineHeight: '1',
    userSelect: 'none',
  },
})

export const skeleton = defineRecipe({
  className: 'skeleton',
  jsx: ['Skeleton'],
  base: {
    borderRadius: 'md',
    bg: 'accent',
    animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
  },
})

export const separator = defineRecipe({
  className: 'separator',
  jsx: ['Separator'],
  base: {
    flexShrink: 0,
    bg: 'border',
  },
  variants: {
    orientation: {
      horizontal: { height: '1px', width: '100%' },
      vertical: { width: '1px', height: '100%', alignSelf: 'stretch' },
    },
  },
  defaultVariants: { orientation: 'horizontal' },
})

export const avatar = defineSlotRecipe({
  className: 'avatar',
  jsx: ['Avatar'],
  slots: ['root', 'image', 'fallback'],
  base: {
    root: {
      position: 'relative',
      display: 'flex',
      height: '10',
      width: '10',
      flexShrink: 0,
      overflow: 'hidden',
      borderRadius: 'full',
    },
    image: { aspectRatio: 'square', height: '100%', width: '100%' },
    fallback: {
      display: 'flex',
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'full',
      bg: 'muted',
      fontSize: 'sm',
    },
  },
})

export const switchRecipe = defineSlotRecipe({
  className: 'switch',
  jsx: ['Switch'],
  slots: ['root', 'thumb'],
  base: {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      height: '1.15rem',
      width: '2rem',
      flexShrink: 0,
      borderRadius: 'full',
      borderWidth: '1px',
      borderColor: 'transparent',
      bg: 'input',
      transition: 'all 0.15s',
      cursor: 'pointer',
      padding: '2px',
      '&[data-state=checked]': { bg: 'primary' },
      _focusVisible: { borderColor: 'ring', boxShadow: '0 0 0 3px {colors.ring}' },
      _disabled: { cursor: 'not-allowed', opacity: 0.5 },
    },
    thumb: {
      pointerEvents: 'none',
      display: 'block',
      height: '1rem',
      width: '1rem',
      borderRadius: 'full',
      bg: 'background',
      boxShadow: 'sm',
      transition: 'transform 0.15s',
      transform: 'translateX(0)',
      '&[data-state=checked]': { transform: 'translateX(calc(100% - 2px))' },
    },
  },
})

export const card = defineSlotRecipe({
  className: 'card',
  jsx: ['Card'],
  slots: ['root', 'header', 'title', 'description', 'content', 'footer'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6',
      borderRadius: 'xl',
      borderWidth: '1px',
      borderColor: 'border',
      bg: 'card',
      color: 'card.foreground',
      paddingBlock: '6',
      boxShadow: 'sm',
    },
    header: { display: 'flex', flexDirection: 'column', gap: '1.5', paddingInline: '6' },
    title: { fontWeight: 'semibold', lineHeight: '1' },
    description: { fontSize: 'sm', color: 'muted.foreground' },
    content: { paddingInline: '6' },
    footer: { display: 'flex', alignItems: 'center', paddingInline: '6' },
  },
})

export const alert = defineSlotRecipe({
  className: 'alert',
  jsx: ['Alert'],
  slots: ['root', 'title', 'description'],
  base: {
    root: {
      position: 'relative',
      width: '100%',
      borderRadius: 'lg',
      borderWidth: '1px',
      borderColor: 'border',
      paddingInline: '4',
      paddingBlock: '3',
      fontSize: 'sm',
      bg: 'card',
      color: 'card.foreground',
      display: 'grid',
      gridTemplateColumns: '0 1fr',
      gap: '0.5',
      '&:has(svg)': { gridTemplateColumns: 'calc(1rem) 1fr', columnGap: '3' },
      '& > svg': { width: '1rem', height: '1rem', translate: '0 2px' },
    },
    title: { gridColumn: 'span 2 / span 2', fontWeight: 'medium', lineHeight: '1' },
    description: {
      gridColumn: 'span 2 / span 2',
      color: 'muted.foreground',
      fontSize: 'sm',
      '& p': { lineHeight: '1.5' },
    },
  },
  variants: {
    variant: {
      default: {},
      destructive: {
        root: { color: 'destructive' },
      },
    },
  },
  defaultVariants: { variant: 'default' },
})

export const tabs = defineSlotRecipe({
  className: 'tabs',
  jsx: ['Tabs'],
  slots: ['root', 'list', 'trigger', 'content'],
  base: {
    root: { display: 'flex', flexDirection: 'column', gap: '2' },
    list: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '9',
      width: 'fit-content',
      borderRadius: 'lg',
      bg: 'muted',
      color: 'muted.foreground',
      padding: '3px',
    },
    trigger: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5',
      height: 'calc(100% - 1px)',
      flex: '1',
      borderRadius: 'md',
      paddingInline: '2',
      paddingBlock: '1',
      fontSize: 'sm',
      fontWeight: 'medium',
      whiteSpace: 'nowrap',
      color: 'foreground',
      cursor: 'pointer',
      transition: 'all 0.15s',
      _selected: { bg: 'background', boxShadow: 'sm' },
      _focusVisible: { borderColor: 'ring', boxShadow: '0 0 0 3px {colors.ring}' },
    },
    content: { flex: '1', outline: 'none' },
  },
})
