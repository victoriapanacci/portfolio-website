import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

/**
 * The site's one button system. Every button and button-shaped link uses
 * `buttonVariants`, so pills, heights, focus rings and icon spacing match
 * everywhere.
 */
const buttonVariants = cva(
  'group/button inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-3 rounded-pill border px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 ease-soft outline-none select-none focus-visible:ring-2 focus-visible:ring-rose/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'border-rose bg-rose text-ink hover:border-peach hover:bg-peach [&_svg]:text-ink',
        outline:
          'border-rose/40 bg-rose/10 text-cream hover:border-rose hover:bg-rose/20',
        ghost:
          'border-transparent bg-transparent text-cream hover:bg-cream/8',
      },
      size: {
        default: '',
        icon: 'size-11 px-0 py-0',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'outline',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
