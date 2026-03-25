import * as React from 'react'
import { Tabs } from '@base-ui/react'

import { cn } from '@/lib/utils'

const TabsList = React.forwardRef<HTMLDivElement, Tabs.List.Props>(
  ({ className, ...props }, ref) => (
    <Tabs.List
      ref={ref}
      className={cn('inline-flex items-stretch rounded-md', className)}
      {...props}
    />
  )
)
TabsList.displayName = 'TabsList'

const TabsTrigger = React.forwardRef<HTMLElement, Tabs.Tab.Props>(
  ({ className, ...props }, ref) => (
    <Tabs.Tab
      ref={ref}
      className={cn(
        'inline-flex flex-1 items-center justify-center whitespace-nowrap border border-primary px-2 py-1 text-sm font-semibold text-primary transition-all -mr-px first:rounded-l-md last:rounded-r-md last:mr-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-active:bg-primary/10 data-active:text-foreground',
        className
      )}
      {...props}
    />
  )
)
TabsTrigger.displayName = 'TabsTrigger'

const TabsContent = React.forwardRef<HTMLDivElement, Tabs.Panel.Props>(
  ({ className, ...props }, ref) => (
    <Tabs.Panel
      ref={ref}
      className={cn(
        'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      {...props}
    />
  )
)
TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent }