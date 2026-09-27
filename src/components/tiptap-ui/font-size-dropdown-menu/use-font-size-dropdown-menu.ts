"use client"

import { useCallback, useEffect, useState } from "react"
import type { Editor } from "@tiptap/react"

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- Lib ---
import { isMarkInSchema, isNodeTypeSelected } from "@/lib/tiptap-utils"

/**
 * Available font sizes (in pixels)
 */
export const FONT_SIZES = [
  { label: "Default", value: "" },
  { label: "8", value: "8px" },
  { label: "9", value: "9px" },
  { label: "10", value: "10px" },
  { label: "11", value: "11px" },
  { label: "12", value: "12px" },
  { label: "14", value: "14px" },
  { label: "16", value: "16px" },
  { label: "18", value: "18px" },
  { label: "24", value: "24px" },
  { label: "30", value: "30px" },
  { label: "36", value: "36px" },
  { label: "48", value: "48px" },
  { label: "60", value: "60px" },
  { label: "72", value: "72px" },
  { label: "96", value: "96px" },
] as const

export type FontSize = (typeof FONT_SIZES)[number]["value"]

/**
 * Configuration for the font size dropdown menu functionality
 */
export interface UseFontSizeDropdownMenuConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null
  /**
   * Available font sizes to show in the dropdown
   * @default FONT_SIZES
   */
  fontSizes?: typeof FONT_SIZES
  /**
   * The default font size to show when no custom size is applied
   * @default "16px"
   */
  defaultFontSize?: string
  /**
   * Whether the dropdown should hide when font size is not available.
   * @default false
   */
  hideWhenUnavailable?: boolean
}

/**
 * Gets the currently active font size
 */
export function getActiveFontSize(editor: Editor | null): string {
  if (!editor || !editor.isEditable) return ""

  const { fontSize } = editor.getAttributes("textStyle")
  return fontSize || ""
}

/**
 * Checks if font size mark is active
 */
export function isFontSizeActive(
  editor: Editor | null,
  fontSize?: string
): boolean {
  if (!editor || !editor.isEditable) return false

  if (fontSize === undefined) {
    return editor.isActive("textStyle", { fontSize: /.+/ })
  }

  if (fontSize === "") {
    return !editor.isActive("textStyle", { fontSize: /.+/ })
  }

  return editor.isActive("textStyle", { fontSize })
}

/**
 * Checks if font size can be toggled in the current editor state
 */
export function canToggleFontSize(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  if (
    !isMarkInSchema("textStyle", editor) ||
    isNodeTypeSelected(editor, ["image", "codeBlock"])
  )
    return false

  try {
    return editor.can().setMark("textStyle", { fontSize: "16px" })
  } catch {
    return false
  }
}

/**
 * Determines if the font size dropdown should be shown
 */
export function shouldShowDropdown(props: {
  editor: Editor | null
  hideWhenUnavailable: boolean
}): boolean {
  const { editor, hideWhenUnavailable } = props

  if (!editor || !editor.isEditable) return false

  if (!hideWhenUnavailable) {
    return true
  }

  if (!isMarkInSchema("textStyle", editor)) return false

  return canToggleFontSize(editor)
}

/**
 * Custom hook that provides font size dropdown menu functionality for Tiptap editor
 *
 * @example
 * ```tsx
 * // Simple usage
 * function MyFontSizeDropdown() {
 *   const {
 *     isVisible,
 *     activeFontSize,
 *     canToggle,
 *     fontSizes,
 *   } = useFontSizeDropdownMenu()
 *
 *   if (!isVisible) return null
 *
 *   return (
 *     <DropdownMenu>
 *       // dropdown content
 *     </DropdownMenu>
 *   )
 * }
 *
 * // Advanced usage with configuration
 * function MyAdvancedFontSizeDropdown() {
 *   const {
 *     isVisible,
 *     activeFontSize,
 *   } = useFontSizeDropdownMenu({
 *     editor: myEditor,
 *     fontSizes: customFontSizes,
 *     defaultFontSize: "16px",
 *     hideWhenUnavailable: true,
 *   })
 *
 *   // component implementation
 * }
 * ```
 */
export function useFontSizeDropdownMenu(
  config?: UseFontSizeDropdownMenuConfig
) {
  const {
    editor: providedEditor,
    fontSizes = FONT_SIZES,
    defaultFontSize = "16px",
    hideWhenUnavailable = false,
  } = config || {}

  const { editor } = useTiptapEditor(providedEditor)
  const [isVisible, setIsVisible] = useState(true)
  const [activeFontSize, setActiveFontSize] = useState<string>("")

  const isActive = isFontSizeActive(editor)
  const canToggle = canToggleFontSize(editor)

  useEffect(() => {
    if (!editor) return

    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowDropdown({ editor, hideWhenUnavailable }))
      setActiveFontSize(getActiveFontSize(editor))
    }

    handleSelectionUpdate()

    editor.on("selectionUpdate", handleSelectionUpdate)
    editor.on("update", handleSelectionUpdate)

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate)
      editor.off("update", handleSelectionUpdate)
    }
  }, [editor, hideWhenUnavailable])

  // Applies a font size (or unsets it for the empty "Default" value). The
  // primary mutation, so a custom UI can act without touching the editor.
  const handleSelectFontSize = useCallback(
    (fontSize: string) => {
      if (!editor || !canToggle) return false
      if (fontSize === "") {
        return editor.chain().focus().unsetFontSize().run()
      }
      return editor.chain().focus().setFontSize(fontSize).run()
    },
    [editor, canToggle]
  )

  // The label to show on the trigger: the applied size (or the document default
  // when nothing inline is set), resolved to its display label.
  const displayFontSize = activeFontSize || defaultFontSize
  const activeLabel =
    fontSizes.find((size) => size.value === displayFontSize)?.label ||
    displayFontSize ||
    "Size"

  return {
    isVisible,
    activeFontSize,
    isActive,
    canToggle,
    fontSizes,
    defaultFontSize,
    /** Apply a font size; `""` unsets it. Returns `true` on success. */
    handleSelectFontSize,
    /** Display label for the trigger, derived from the active/default size. */
    activeLabel,
    label: "Font Size",
  }
}
