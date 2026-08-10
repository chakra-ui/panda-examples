import type { ComponentProps } from 'react'
import { alert, type AlertVariantProps } from '../../styled-system/recipes'
import { cx } from '../../styled-system/css'

export type AlertProps = ComponentProps<'div'> & AlertVariantProps

export function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      data-slot="alert"
      className={cx(alert({ variant }).root, className)}
      {...props}
    />
  )
}

export function AlertTitle({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="alert-title" className={cx(alert().title, className)} {...props} />
}

export function AlertDescription({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="alert-description" className={cx(alert().description, className)} {...props} />
}
