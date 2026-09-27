"use client"

import { forwardRef, useCallback, useState } from "react"

// --- Icons ---
import { ChevronDownIcon } from "@/components/tiptap-icons/chevron-down-icon"

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- Tiptap UI ---
import type { UseFontFamilyDropdownMenuConfig } from "@/components/tiptap-ui/font-family-dropdown-menu"
import { useFontFamilyDropdownMenu } from "@/components/tiptap-ui/font-family-dropdown-menu"

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

export interface FontFamilyDropdownMenuProps
  extends Omit<ButtonProps, "type">, UseFontFamilyDropdownMenuConfig {
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
 * Dropdown menu component for selecting font families in a Tiptap editor.
 *
 * For custom dropdown implementations, use the `useFontFamilyDropdownMenu` hook instead.
 */
export const FontFamilyDropdownMenu = forwardRef<
  HTMLButtonElement,
  FontFamilyDropdownMenuProps
>(
  (
    {
      editor: providedEditor,
      fontFamilies,
      defaultFontFamily,
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
      fontFamilies: families,
      activeFontFamily,
      handleSelectFontFamily,
      activeLabel,
    } = useFontFamilyDropdownMenu({
      editor,
      fontFamilies,
      defaultFontFamily,
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

    const handleFontFamilySelect = useCallback(
      (fontFamily: string) => {
        if (handleSelectFontFamily(fontFamily)) setIsOpen(false)
      },
      [handleSelectFontFamily]
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
            aria-label="Select font family"
            aria-pressed={isActive}
            tooltip="Font Family"
            {...buttonProps}
            ref={ref}
          >
            <span className="tiptap-button-text">{activeLabel}</span>
            <ChevronDownIcon className="tiptap-button-dropdown-small" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          <DropdownMenuGroup>
            {families.map((family) => (
              <DropdownMenuItem
                key={`font-family-${family.value || "default"}`}
                asChild
              >
                <Button
                  type="button"
                  data-style="ghost"
                  data-active-state={
                    activeFontFamily === family.value ? "on" : "off"
                  }
                  onClick={() => handleFontFamilySelect(family.value)}
                  style={{ fontFamily: family.value || undefined }}
                >
                  <span className="tiptap-button-text">{family.label}</span>
                </Button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
)

FontFamilyDropdownMenu.displayName = "FontFamilyDropdownMenu"

export default FontFamilyDropdownMenu
