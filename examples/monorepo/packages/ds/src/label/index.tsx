import type { ComponentProps } from 'react'
import { label } from '../../styled-system/recipes'
import { cx } from '../../styled-system/css'

export function Label({ className, ...props }: ComponentProps<'label'>) {
  return <label data-slot="label" className={cx(label(), className)} {...props} />
}
