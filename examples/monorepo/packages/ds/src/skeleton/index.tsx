import type { ComponentProps } from 'react'
import { skeleton } from '../../styled-system/recipes'
import { cx } from '../../styled-system/css'

export function Skeleton({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="skeleton" className={cx(skeleton(), className)} {...props} />
}
