"use client"

import { forwardRef, useCallback, useState } from "react"

// --- Icons ---
import { ChevronDownIcon } from "@/components/tiptap-icons/chevron-down-icon"

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- Tiptap UI ---
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button"
import type { UseTextAlignDropdownMenuConfig } from "@/components/tiptap-ui/text-align-dropdown-menu"
import { useTextAlignDropdownMenu } from "@/components/tiptap-ui/text-align-dropdown-menu"

// --- UI Primitives ---
import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap-ui-primitive/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/components/tiptap-ui-primitive/dropdown-menu"
import { ButtonGroup } from "@/components/tiptap-ui-primitive/button-group"

export interface TextAlignDropdownMenuProps
  extends Omit<ButtonProps, "type">, UseTextAlignDropdownMenuConfig {
  /**
   * Callback for when the dropdown opens or closes
   */
  onOpenChange?: (isOpen: boolean) => void
  /**
   * Whether the dropdown should use a modal
   */
  modal?: boolean
}

/**
 * Dropdown menu component for selecting text alignment in a Tiptap editor.
 *
 * For custom dropdown implementations, use the `useTextAlignDropdownMenu` hook instead.
 */
export const TextAlignDropdownMenu = forwardRef<
  HTMLButtonElement,
  TextAlignDropdownMenuProps
>(
  (
    {
      editor: providedEditor,
      alignments = ["left", "center", "right", "justify"],
      hideWhenUnavailable = false,
      onOpenChange,
      modal = true,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { isVisible, isActive, canToggle, Icon } = useTextAlignDropdownMenu({
      editor,
      alignments,
      hideWhenUnavailable,
    })

    const handleOpenChange = useCallback(
      (open: boolean) => {
        if (!editor || !canToggle) return
        setIsOpen(open)
        onOpenChange?.(open)
      },
      [canToggle, editor, onOpenChange]
    )

    if (!isVisible) {
      return null
    }

    return (
      <DropdownMenu modal={modal} open={isOpen} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            data-style="ghost"
            data-active-state={isActive ? "on" : "off"}
            role="button"
            tabIndex={-1}
            disabled={!canToggle}
            data-disabled={!canToggle}
            aria-label="Text alignment"
            aria-pressed={isActive}
            tooltip="Text alignment"
            {...buttonProps}
            ref={ref}
          >
            <Icon className="tiptap-button-icon" />
            <ChevronDownIcon className="tiptap-button-dropdown-small" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" collisionPadding={4}>
          <DropdownMenuGroup asChild>
            <ButtonGroup orientation="horizontal">
              {alignments.map((align) => (
                <ButtonGroup key={`text-align-${align}`}>
                  <DropdownMenuItem asChild>
                    <TextAlignButton editor={editor} align={align} />
                  </DropdownMenuItem>
                </ButtonGroup>
              ))}
            </ButtonGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)

TextAlignDropdownMenu.displayName = "TextAlignDropdownMenu"

export default TextAlignDropdownMenu
