import type { ComponentProps } from 'react'
import { textarea } from '../../styled-system/recipes'
import { cx } from '../../styled-system/css'

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea data-slot="textarea" className={cx(textarea(), className)} {...props} />
}
