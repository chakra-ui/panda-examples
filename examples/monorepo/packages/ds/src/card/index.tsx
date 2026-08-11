import type { ComponentProps } from 'react'
import { card } from '../../styled-system/recipes'
import { cx } from '../../styled-system/css'

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card" className={cx(card().root, className)} {...props} />
}

export function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-header" className={cx(card().header, className)} {...props} />
}

export function CardTitle({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-title" className={cx(card().title, className)} {...props} />
}

export function CardDescription({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div data-slot="card-description" className={cx(card().description, className)} {...props} />
  )
}

export function CardAction({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-action" className={cx(card().action, className)} {...props} />
}

export function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cx(card().content, className)} {...props} />
}

export function CardFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="card-footer" className={cx(card().footer, className)} {...props} />
}
