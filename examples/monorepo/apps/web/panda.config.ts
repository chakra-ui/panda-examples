import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  designSystem: '@chakra-ui/shadcn-panda',
  include: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
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
      tokens: {
        fonts: {
          display: { value: 'var(--font-display), ui-sans-serif, system-ui, sans-serif' },
          body: { value: 'var(--font-body), ui-sans-serif, system-ui, sans-serif' },
        },
      },
      semanticTokens: {
        colors: {
          frame: {
            canvas: { value: { base: '#FAF8F3', _dark: '#16150F' } },
            ink: { value: { base: '#16150F', _dark: '#FAF8F3' } },
            card: { value: { base: '#EFEEE8', _dark: '#232320' } },
            brand: { value: { base: '#FACC15', _dark: '#FACC15' } },
            eyebrow: { value: { base: '#A16207', _dark: '#FACC15' } },
            muted: { value: { base: '#6F6E66', _dark: '#A3A29B' } },
            teal: { value: { base: '#2AA79B', _dark: '#4FD1C5' } },
          },
        },
      },
    },
  },
})
