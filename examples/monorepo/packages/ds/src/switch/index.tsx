'use client'

import { useState, type ComponentProps } from 'react'
import { switchRecipe } from '../../styled-system/recipes'
import { cx } from '../../styled-system/css'

export type SwitchProps = Omit<ComponentProps<'button'>, 'onChange'> & {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  size?: 'default' | 'sm'
}

export function Switch({
  className,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  size = 'default',
  ...props
}: SwitchProps) {
  const [internal, setInternal] = useState(defaultChecked ?? false)
  const isChecked = checked ?? internal
  const state = isChecked ? 'checked' : 'unchecked'
  const slots = switchRecipe({ size })

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      data-state={state}
      data-size={size}
      data-slot="switch"
      disabled={disabled}
      className={cx(slots.root, className)}
      onClick={() => {
        const next = !isChecked
        if (checked === undefined) setInternal(next)
        onCheckedChange?.(next)
      }}
      {...props}
    >
      <span data-state={state} data-slot="switch-thumb" className={slots.thumb} />
    </button>
  )
}
