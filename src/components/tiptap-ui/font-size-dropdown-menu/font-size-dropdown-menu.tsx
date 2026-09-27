"use client"

import { forwardRef, useCallback, useState } from "react"

// --- Icons ---
import { ChevronDownIcon } from "@/components/tiptap-icons/chevron-down-icon"

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- Tiptap UI ---
import type { UseFontSizeDropdownMenuConfig } from "@/components/tiptap-ui/font-size-dropdown-menu"
import { useFontSizeDropdownMenu } from "@/components/tiptap-ui/font-size-dropdown-menu"

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

export interface FontSizeDropdownMenuProps
  extends Omit<ButtonProps, "type">, UseFontSizeDropdownMenuConfig {
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
 * Dropdown menu component for selecting font sizes in a Tiptap editor.
 *
 * For custom dropdown implementations, use the `useFontSizeDropdownMenu` hook instead.
 */
export const FontSizeDropdownMenu = forwardRef<
  HTMLButtonElement,
  FontSizeDropdownMenuProps
>(
  (
    {
      editor: providedEditor,
      fontSizes,
      defaultFontSize,
      hideWhenUnavailable = false,
      onOpenChange,
      modal = true,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {
      isVisible,
      isActive,
      canToggle,
      fontSizes: sizes,
      activeFontSize,
      handleSelectFontSize,
      activeLabel,
    } = useFontSizeDropdownMenu({
      editor,
      fontSizes,
      defaultFontSize,
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

    const handleFontSizeSelect = useCallback(
      (fontSize: string) => {
        if (handleSelectFontSize(fontSize)) setIsOpen(false)
      },
      [handleSelectFontSize]
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
            aria-label="Select font size"
            aria-pressed={isActive}
            tooltip="Font Size"
            {...buttonProps}
            ref={ref}
          >
            <span className="tiptap-button-text">{activeLabel}</span>
            <ChevronDownIcon className="tiptap-button-dropdown-small" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" collisionPadding={4}>
          <DropdownMenuGroup>
            {sizes.map((size) => (
              <DropdownMenuItem
                key={`font-size-${size.value || "default"}`}
                asChild
              >
                <Button
                  type="button"
                  data-style="ghost"
                  data-active-state={
                    activeFontSize === size.value ? "on" : "off"
                  }
                  onClick={() => handleFontSizeSelect(size.value)}
                >
                  <span className="tiptap-button-text">{size.label}</span>
                </Button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)

FontSizeDropdownMenu.displayName = "FontSizeDropdownMenu"

export default FontSizeDropdownMenu
