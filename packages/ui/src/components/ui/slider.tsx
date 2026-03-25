'use client'

import * as React from 'react'
import { Slider as SliderPrimitive } from '@base-ui/react'

import { cn } from '@/lib/utils'

const Slider = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, defaultValue, value, ...props }, ref) => {
  // Determine thumb count from the value array; Base UI accepts number | readonly number[]
  // but a single number is not a valid slider value in practice — normalise to array first.
  const resolvedValue = value ?? defaultValue ?? [0]
  const thumbCount = Array.isArray(resolvedValue) ? resolvedValue.length : 1

  return (
    <SliderPrimitive.Root
      ref={ref}
      value={value}
      defaultValue={defaultValue ?? [0]}
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      {...props}
    >
      <SliderPrimitive.Control className="relative flex w-full items-center">
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Indicator className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {Array.from({ length: thumbCount }, (_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className={cn(
              'block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors',
              'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
              'disabled:pointer-events-none disabled:opacity-50',
              'data-dragging:ring-1 data-dragging:ring-ring'
            )}
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
})
Slider.displayName = 'Slider'

export { Slider }
