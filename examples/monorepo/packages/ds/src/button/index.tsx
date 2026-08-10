import type { ComponentProps } from 'react'
import { button, type ButtonVariantProps } from '../../styled-system/recipes'
import { cx } from '../../styled-system/css'

export type ButtonProps = ComponentProps<'button'> & ButtonVariantProps

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cx(button({ variant, size }), className)}
      {...props}
    />
  )
}
