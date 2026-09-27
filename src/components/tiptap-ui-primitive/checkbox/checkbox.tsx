"use client"

import { cn } from "@/lib/tiptap-utils"
import { CheckIcon } from "@/components/tiptap-icons/check-icon"
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"

import "./checkbox.scss"

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="tiptap-checkbox"
      className={cn("tiptap-checkbox-root", className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="tiptap-checkbox-indicator"
        className="tiptap-checkbox-indicator"
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
