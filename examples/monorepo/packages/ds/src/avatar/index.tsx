import type { ComponentProps } from 'react'
import { avatar } from '../../styled-system/recipes'
import { cx } from '../../styled-system/css'

export function Avatar({ className, ...props }: ComponentProps<'span'>) {
  return <span data-slot="avatar" className={cx(avatar().root, className)} {...props} />
}

export function AvatarImage({ className, ...props }: ComponentProps<'img'>) {
  return <img data-slot="avatar-image" className={cx(avatar().image, className)} {...props} />
}

export function AvatarFallback({ className, ...props }: ComponentProps<'span'>) {
  return <span data-slot="avatar-fallback" className={cx(avatar().fallback, className)} {...props} />
}
