import { defineSemanticTokens } from '@pandacss/dev'

export const semanticTokens = defineSemanticTokens({
  colors: {
    background: { value: { base: 'oklch(1 0 0)', _dark: 'oklch(0.145 0 0)' } },
    foreground: { value: { base: 'oklch(0% 0 0)', _dark: 'oklch(0.985 0 0)' } },
    card: {
      DEFAULT: { value: { base: 'oklch(1 0 0)', _dark: 'oklch(0.205 0 0)' } },
      foreground: { value: { base: 'oklch(0% 0 0)', _dark: 'oklch(0.985 0 0)' } },
    },
    popover: {
      DEFAULT: { value: { base: 'oklch(1 0 0)', _dark: 'oklch(0.205 0 0)' } },
      foreground: { value: { base: 'oklch(0% 0 0)', _dark: 'oklch(0.985 0 0)' } },
    },
    primary: {
      DEFAULT: { value: { base: 'oklch(0% 0 0)', _dark: 'oklch(0.922 0 0)' } },
      foreground: { value: { base: 'oklch(0.985 0 0)', _dark: 'oklch(0.205 0 0)' } },
    },
    secondary: {
      DEFAULT: { value: { base: 'oklch(0.97 0 0)', _dark: 'oklch(0.269 0 0)' } },
      foreground: { value: { base: 'oklch(0.205 0 0)', _dark: 'oklch(0.985 0 0)' } },
    },
    muted: {
      DEFAULT: { value: { base: 'oklch(0.97 0 0)', _dark: 'oklch(0.269 0 0)' } },
      foreground: { value: { base: 'oklch(0.556 0 0)', _dark: 'oklch(0.708 0 0)' } },
    },
    accent: {
      DEFAULT: { value: { base: 'oklch(0.97 0 0)', _dark: 'oklch(0.371 0 0)' } },
      foreground: { value: { base: 'oklch(0.205 0 0)', _dark: 'oklch(0.985 0 0)' } },
    },
    destructive: {
      DEFAULT: { value: { base: 'oklch(0.577 0.245 27.325)', _dark: 'oklch(0.704 0.191 22.216)' } },
      foreground: { value: { base: 'oklch(0.985 0 0)', _dark: 'oklch(0.985 0 0)' } },
    },
    border: { value: { base: 'oklch(0.922 0 0)', _dark: 'oklch(1 0 0 / 10%)' } },
    input: { value: { base: 'oklch(0.922 0 0)', _dark: 'oklch(1 0 0 / 15%)' } },
    ring: { value: { base: 'oklch(0.708 0 0)', _dark: 'oklch(0.556 0 0)' } },
  },
})
