import type { ComponentProps } from 'react'
import { badge, type BadgeVariantProps } from '../../styled-system/recipes'
import { cx } from '../../styled-system/css'

export type BadgeProps = ComponentProps<'span'> & BadgeVariantProps

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      className={cx(badge({ variant }), className)}
      {...props}
    />
  )
}
