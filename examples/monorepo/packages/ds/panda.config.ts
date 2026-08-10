import { defineConfig } from '@pandacss/dev'
import { tokens } from './src/theme/tokens'
import { semanticTokens } from './src/theme/semantic-tokens'
import {
  button,
  badge,
  input,
  textarea,
  label,
  skeleton,
  separator,
  avatar,
  switchRecipe,
  card,
  alert,
  tabs,
} from './src/theme/recipes'

export default defineConfig({
  presets: ['@pandacss/preset-base', '@pandacss/preset-panda'],
  include: ['src/**/*.{ts,tsx}'],
  outdir: 'styled-system',
  jsxFramework: 'react',
  preflight: true,
  conditions: {
    extend: {
      dark: '.dark &',
    },
  },
  staticCss: {
    recipes: '*',
  },
  theme: {
    extend: {
      breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      tokens,
      semanticTokens,
      recipes: {
        button,
        badge,
        input,
        textarea,
        label,
        skeleton,
        separator,
      },
      slotRecipes: {
        avatar,
        switchRecipe,
        card,
        alert,
        tabs,
      },
    },
  },
})
