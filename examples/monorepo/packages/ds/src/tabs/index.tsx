'use client'

import { createContext, useContext, useState, type ComponentProps } from 'react'
import { tabs } from '../../styled-system/recipes'
import { cx } from '../../styled-system/css'

type TabsContextValue = { value: string; setValue: (value: string) => void }
const TabsContext = createContext<TabsContextValue | null>(null)

function useTabs() {
  const ctx = useContext(TabsContext)
  if (!ctx) throw new Error('Tabs components must be used within <Tabs>')
  return ctx
}

export type TabsProps = ComponentProps<'div'> & {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

export function Tabs({
  className,
  defaultValue = '',
  value,
  onValueChange,
  children,
  ...props
}: TabsProps) {
  const [internal, setInternal] = useState(defaultValue)
  const current = value ?? internal
  const setValue = (next: string) => {
    if (value === undefined) setInternal(next)
    onValueChange?.(next)
  }
  return (
    <TabsContext.Provider value={{ value: current, setValue }}>
      <div data-slot="tabs" className={cx(tabs().root, className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div role="tablist" data-slot="tabs-list" className={cx(tabs().list, className)} {...props} />
  )
}

export type TabsTriggerProps = ComponentProps<'button'> & { value: string }

export function TabsTrigger({ className, value, ...props }: TabsTriggerProps) {
  const ctx = useTabs()
  const selected = ctx.value === value
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      data-state={selected ? 'active' : 'inactive'}
      data-slot="tabs-trigger"
      className={cx(tabs().trigger, className)}
      onClick={() => ctx.setValue(value)}
      {...props}
    />
  )
}

export type TabsContentProps = ComponentProps<'div'> & { value: string }

export function TabsContent({ className, value, ...props }: TabsContentProps) {
  const ctx = useTabs()
  if (ctx.value !== value) return null
  return (
    <div
      role="tabpanel"
      data-slot="tabs-content"
      className={cx(tabs().content, className)}
      {...props}
    />
  )
}
