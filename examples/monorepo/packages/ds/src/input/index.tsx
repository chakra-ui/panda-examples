import type { ComponentProps } from 'react'
import { input } from '../../styled-system/recipes'
import { cx } from '../../styled-system/css'

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input data-slot="input" className={cx(input(), className)} {...props} />
}
