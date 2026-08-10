import type { ComponentProps } from 'react'
import { separator, type SeparatorVariantProps } from '../../styled-system/recipes'
import { cx } from '../../styled-system/css'

export type SeparatorProps = ComponentProps<'div'> & SeparatorVariantProps

export function Separator({ className, orientation, ...props }: SeparatorProps) {
  return (
    <div
      role="separator"
      data-slot="separator"
      data-orientation={orientation}
      className={cx(separator({ orientation }), className)}
      {...props}
    />
  )
}
