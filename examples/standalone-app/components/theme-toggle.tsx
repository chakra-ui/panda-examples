'use client'

import { useSyncExternalStore } from 'react'
import { Switch } from 'pandacn'

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
    <label className="frame-toggle">
      {dark ? 'Dark' : 'Light'}
      <Switch checked={dark} onCheckedChange={setTheme} aria-label="Toggle dark mode" />
    </label>
  )
}
