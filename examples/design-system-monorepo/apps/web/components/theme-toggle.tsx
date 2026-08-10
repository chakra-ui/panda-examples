'use client'

import { useEffect, useState } from 'react'
import { Switch } from '@chakra-ui/shadcn-panda'
import { css } from '../styled-system/css'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const isDark = stored
      ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggle = (next: boolean) => {
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <label
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: '2.5',
        fontSize: '13px',
        fontWeight: 'medium',
        color: 'frame.muted',
        cursor: 'pointer',
        userSelect: 'none',
      })}
    >
      {dark ? 'Dark' : 'Light'}
      <Switch checked={dark} onCheckedChange={toggle} aria-label="Toggle dark mode" />
    </label>
  )
}
