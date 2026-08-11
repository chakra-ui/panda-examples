'use client'

import { useSyncExternalStore } from 'react'
import { Switch } from 'pandacn'
import { css } from '../styled-system/css'

function subscribe(callback: () => void) {
  window.addEventListener('theme-change', callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener('theme-change', callback)
    window.removeEventListener('storage', callback)
  }
}

function isDark() {
  return document.documentElement.classList.contains('dark')
}

function setTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem('theme', dark ? 'dark' : 'light')
  window.dispatchEvent(new Event('theme-change'))
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, isDark, () => false)

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
      <Switch checked={dark} onCheckedChange={setTheme} aria-label="Toggle dark mode" />
    </label>
  )
}
