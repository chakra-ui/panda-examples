import { defineRecipe, defineSlotRecipe } from '@pandacss/dev'

const alpha = (varName: string, pct: number) =>
  `color-mix(in oklab, var(${varName}) ${pct}%, transparent)`

const focusRing = {
  outline: 'none',
  _focusVisible: {
    borderColor: 'ring',
    boxShadow: `0 0 0 3px ${alpha('--colors-ring', 50)}`,
  },
}

const ariaInvalid = {
  '&[aria-invalid=true]': {
    borderColor: 'destructive',
    boxShadow: `0 0 0 3px ${alpha('--colors-destructive', 20)}`,
    _dark: { boxShadow: `0 0 0 3px ${alpha('--colors-destructive', 40)}` },
  },
}

const svgInherit = {
  '& svg': { pointerEvents: 'none', flexShrink: 0 },
  "& svg:not([class*='size-'])": { width: '1rem', height: '1rem' },
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
    ...ariaInvalid,
    ...svgInherit,
    _disabled: { pointerEvents: 'none', opacity: 0.5 },
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
        _focusVisible: { boxShadow: `0 0 0 3px ${alpha('--colors-destructive', 20)}` },
        _dark: {
          bg: alpha('--colors-destructive', 60),
          _focusVisible: { boxShadow: `0 0 0 3px ${alpha('--colors-destructive', 40)}` },
        },
      },
      outline: {
        borderWidth: '1px',
        borderColor: 'border',
        bg: 'background',
        boxShadow: 'xs',
        _hover: { bg: 'accent', color: 'accent.foreground' },
        _dark: {
          borderColor: 'input',
          bg: alpha('--colors-input', 30),
          _hover: { bg: alpha('--colors-input', 50) },
        },
      },
      secondary: {
        bg: 'secondary',
        color: 'secondary.foreground',
        _hover: { bg: alpha('--colors-secondary', 80) },
      },
      ghost: {
        _hover: { bg: 'accent', color: 'accent.foreground' },
        _dark: { _hover: { bg: alpha('--colors-accent', 50) } },
      },
      link: {
        color: 'primary',
        textUnderlineOffset: '4px',
        _hover: { textDecoration: 'underline' },
      },
    },
    size: {
      default: {
        height: '9',
        paddingInline: '4',
        paddingBlock: '2',
        '&:has(> svg)': { paddingInline: '3' },
      },
      sm: {
        height: '8',
        borderRadius: 'md',
        gap: '1.5',
        paddingInline: '3',
        '&:has(> svg)': { paddingInline: '2.5' },
      },
      lg: {
        height: '10',
        borderRadius: 'md',
        paddingInline: '6',
        '&:has(> svg)': { paddingInline: '4' },
      },
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
    width: 'fit-content',
    flexShrink: 0,
    gap: '1',
    overflow: 'hidden',
    borderRadius: 'full',
    borderWidth: '1px',
    borderColor: 'transparent',
    paddingInline: '2',
    paddingBlock: '0.5',
    fontSize: 'xs',
    fontWeight: 'medium',
    whiteSpace: 'nowrap',
    transition: 'color 0.15s, box-shadow 0.15s',
    ...focusRing,
    ...ariaInvalid,
    '& > svg': { width: '0.75rem', height: '0.75rem', pointerEvents: 'none' },
  },
  variants: {
    variant: {
      default: { bg: 'primary', color: 'primary.foreground' },
      secondary: { bg: 'secondary', color: 'secondary.foreground' },
      destructive: {
        bg: 'destructive',
        color: 'white',
        _dark: { bg: alpha('--colors-destructive', 60) },
      },
      outline: { borderColor: 'border', color: 'foreground' },
      ghost: { color: 'foreground' },
      link: { color: 'primary', textUnderlineOffset: '4px' },
    },
  },
  defaultVariants: { variant: 'default' },
})

const field = {
  display: 'flex',
  width: '100%',
  minWidth: '0',
  borderRadius: 'md',
  borderWidth: '1px',
  borderColor: 'input',
  bg: 'transparent',
  fontSize: { base: 'md', md: 'sm' },
  boxShadow: 'xs',
  transition: 'color 0.15s, box-shadow 0.15s',
  _placeholder: { color: 'muted.foreground' },
  _dark: { bg: alpha('--colors-input', 30) },
  '&::selection': { bg: 'primary', color: 'primary.foreground' },
  '&::file-selector-button': {
    display: 'inline-flex',
    height: '7',
    border: '0',
    background: 'transparent',
    fontSize: 'sm',
    fontWeight: 'medium',
    color: 'foreground',
  },
  ...focusRing,
  ...ariaInvalid,
  _disabled: { pointerEvents: 'none', cursor: 'not-allowed', opacity: 0.5 },
}

export const input = defineRecipe({
  className: 'input',
  jsx: ['Input'],
  base: {
    ...field,
    height: '9',
    paddingInline: '3',
    paddingBlock: '1',
  },
})

export const textarea = defineRecipe({
  className: 'textarea',
  jsx: ['Textarea'],
  base: {
    ...field,
    minHeight: '16',
    paddingInline: '3',
    paddingBlock: '2',
    fieldSizing: 'content',
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
    '&:has(+ :disabled), &[data-disabled=true]': {
      pointerEvents: 'none',
      opacity: 0.5,
    },
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
  base: { flexShrink: 0, bg: 'border' },
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
      flexShrink: 0,
      overflow: 'hidden',
      borderRadius: 'full',
      userSelect: 'none',
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
      color: 'muted.foreground',
      fontSize: 'sm',
      '[data-size=sm] &': { fontSize: 'xs' },
    },
  },
  variants: {
    size: {
      default: { root: { height: '8', width: '8' } },
      sm: { root: { height: '6', width: '6' } },
      lg: { root: { height: '10', width: '10' } },
    },
  },
  defaultVariants: { size: 'default' },
})

export const switchRecipe = defineSlotRecipe({
  className: 'switch',
  jsx: ['Switch'],
  slots: ['root', 'thumb'],
  base: {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      flexShrink: 0,
      borderRadius: 'full',
      borderWidth: '1px',
      borderColor: 'transparent',
      bg: 'input',
      boxShadow: 'xs',
      transition: 'all 0.15s',
      cursor: 'pointer',
      padding: '2px',
      ...focusRing,
      '&[data-state=checked]': { bg: 'primary' },
      _dark: { bg: alpha('--colors-input', 80) },
      _disabled: { cursor: 'not-allowed', opacity: 0.5 },
    },
    thumb: {
      pointerEvents: 'none',
      display: 'block',
      borderRadius: 'full',
      bg: 'background',
      transition: 'transform 0.15s',
      transform: 'translateX(0)',
      '&[data-state=checked]': { transform: 'translateX(calc(100% - 2px))' },
      _dark: {
        bg: 'foreground',
        '&[data-state=checked]': { bg: 'primary.foreground' },
      },
    },
  },
  variants: {
    size: {
      default: {
        root: { height: '1.15rem', width: '2rem' },
        thumb: { height: '1rem', width: '1rem' },
      },
      sm: {
        root: { height: '0.875rem', width: '1.5rem' },
        thumb: { height: '0.75rem', width: '0.75rem' },
      },
    },
  },
  defaultVariants: { size: 'default' },
})

export const card = defineSlotRecipe({
  className: 'card',
  jsx: ['Card'],
  slots: ['root', 'header', 'title', 'description', 'action', 'content', 'footer'],
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
    header: {
      display: 'grid',
      gridAutoRows: 'min-content',
      gridTemplateRows: 'auto auto',
      alignItems: 'start',
      gap: '2',
      paddingInline: '6',
      '&:has([data-slot=card-action])': { gridTemplateColumns: '1fr auto' },
    },
    title: { fontWeight: 'semibold', lineHeight: '1' },
    description: { fontSize: 'sm', color: 'muted.foreground' },
    action: {
      gridColumnStart: '2',
      gridRow: 'span 2 / span 2',
      gridRowStart: '1',
      alignSelf: 'start',
      justifySelf: 'end',
    },
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
      display: 'grid',
      gridTemplateColumns: '0 1fr',
      alignItems: 'start',
      rowGap: '0.5',
      borderRadius: 'lg',
      borderWidth: '1px',
      borderColor: 'border',
      paddingInline: '4',
      paddingBlock: '3',
      fontSize: 'sm',
      bg: 'card',
      color: 'card.foreground',
      '&:has(> svg)': { gridTemplateColumns: '1rem 1fr', columnGap: '3' },
      '& > svg': { width: '1rem', height: '1rem', translate: '0 2px', color: 'currentColor' },
    },
    title: {
      gridColumnStart: '2',
      minHeight: '1rem',
      fontWeight: 'medium',
      letterSpacing: '-0.01em',
      display: '-webkit-box',
      WebkitLineClamp: '1',
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
    description: {
      gridColumnStart: '2',
      display: 'grid',
      justifyItems: 'start',
      gap: '1',
      fontSize: 'sm',
      color: 'muted.foreground',
      '& p': { lineHeight: '1.6' },
    },
  },
  variants: {
    variant: {
      default: {},
      destructive: {
        root: {
          color: 'destructive',
          '& [data-slot=alert-description]': { color: alpha('--colors-destructive', 90) },
        },
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
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5',
      height: 'calc(100% - 1px)',
      flex: '1',
      borderRadius: 'md',
      borderWidth: '1px',
      borderColor: 'transparent',
      paddingInline: '2',
      paddingBlock: '1',
      fontSize: 'sm',
      fontWeight: 'medium',
      whiteSpace: 'nowrap',
      color: alpha('--colors-foreground', 60),
      cursor: 'pointer',
      transition: 'all 0.15s',
      ...focusRing,
      _hover: { color: 'foreground' },
      '&[data-state=active]': { bg: 'background', color: 'foreground', boxShadow: 'sm' },
      _dark: {
        color: 'muted.foreground',
        _hover: { color: 'foreground' },
        '&[data-state=active]': {
          borderColor: 'input',
          bg: alpha('--colors-input', 30),
          color: 'foreground',
        },
      },
      "& svg:not([class*='size-'])": { width: '1rem', height: '1rem' },
    },
    content: { flex: '1', outline: 'none' },
  },
})
