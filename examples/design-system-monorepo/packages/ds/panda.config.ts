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
  presets: ['@pandacss/preset-base'],
  include: ['src/**/*.{ts,tsx}'],
  outdir: 'styled-system',
  jsxFramework: 'react',
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
