import * as React from 'react'
import { Checkbox as CheckboxPrimitive } from '@base-ui/react'
import { Check, Minus } from 'lucide-react'

import { cn } from '@/lib/utils'

const Checkbox = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, indeterminate, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    indeterminate={indeterminate}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border bg-background border-input/30 transition-colors',
      'hover:border-input/50',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:cursor-not-allowed disabled:bg-muted/10 disabled:border-muted/10',
      'data-[checked]:bg-primary data-[checked]:border-primary data-[checked]:text-primary-foreground',
      'data-[indeterminate]:bg-primary data-[indeterminate]:border-primary data-[indeterminate]:text-primary-foreground',
      className
    )}
    {...props}
  >
    {/* keepMounted ensures the indicator stays in the DOM so we can always render the correct icon */}
    <CheckboxPrimitive.Indicator keepMounted className={cn('flex items-center justify-center text-current data-[unchecked]:hidden')}>
      {indeterminate ? (
        <Minus className="h-3 w-3" />
      ) : (
        <Check className="h-3 w-3" />
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = 'Checkbox'

export { Checkbox }