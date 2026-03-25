'use client'

import { Collapsible } from '@base-ui/react'

const CollapsibleTrigger = Collapsible.Trigger
// Base UI renamed Content → Panel; re-export under the original name for API compatibility
const CollapsibleContent = Collapsible.Panel

export { Collapsible, CollapsibleTrigger, CollapsibleContent }