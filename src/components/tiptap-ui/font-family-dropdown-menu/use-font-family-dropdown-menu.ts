"use client"

import { useCallback, useEffect, useState } from "react"
import type { Editor } from "@tiptap/react"

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- Lib ---
import { isMarkInSchema, isNodeTypeSelected } from "@/lib/tiptap-utils"

/**
 * Available font families
 */
export const FONT_FAMILIES = [
  { label: "Default", value: "" },
  { label: "Inter", value: "Inter" },
  { label: "Arial", value: "Arial" },
  { label: "Helvetica", value: "Helvetica" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Georgia", value: "Georgia" },
  { label: "Courier New", value: "Courier New" },
  { label: "Verdana", value: "Verdana" },
  { label: "Comic Sans MS", value: "Comic Sans MS" },
] as const

export type FontFamily = (typeof FONT_FAMILIES)[number]["value"]

/**
 * Configuration for the font family dropdown menu functionality
 */
export interface UseFontFamilyDropdownMenuConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null
  /**
   * Available font families to show in the dropdown
   * @default FONT_FAMILIES
   */
  fontFamilies?: typeof FONT_FAMILIES
  /**
   * The default font family to show when no custom font is applied
   * @default "Inter"
   */
  defaultFontFamily?: string
  /**
   * Whether the dropdown should hide when font family is not available.
   * @default false
   */
  hideWhenUnavailable?: boolean
}

/**
 * Gets the currently active font family
 */
export function getActiveFontFamily(editor: Editor | null): string {
  if (!editor || !editor.isEditable) return ""

  const { fontFamily } = editor.getAttributes("textStyle")
  return fontFamily || ""
}

/**
 * Checks if font family mark is active
 */
export function isFontFamilyActive(
  editor: Editor | null,
  fontFamily?: string
): boolean {
  if (!editor || !editor.isEditable) return false

  if (fontFamily === undefined) {
    return editor.isActive("textStyle", { fontFamily: /.+/ })
  }

  if (fontFamily === "") {
    return !editor.isActive("textStyle", { fontFamily: /.+/ })
  }

  return editor.isActive("textStyle", { fontFamily })
}

/**
 * Checks if font family can be toggled in the current editor state
 */
export function canToggleFontFamily(editor: Editor | null): boolean {
  if (!editor || !editor.isEditable) return false
  if (
    !isMarkInSchema("textStyle", editor) ||
    isNodeTypeSelected(editor, ["image", "codeBlock"])
  )
    return false

  try {
    return editor.can().setMark("textStyle", { fontFamily: "Arial" })
  } catch {
    return false
  }
}

/**
 * Determines if the font family dropdown should be shown
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

  // hideWhenUnavailable=true: check schema and capability
  if (!isMarkInSchema("textStyle", editor)) return false

  return canToggleFontFamily(editor)
}

/**
 * Custom hook that provides font family dropdown menu functionality for Tiptap editor
 *
 * @example
 * ```tsx
 * // Simple usage
 * function MyFontFamilyDropdown() {
 *   const {
 *     isVisible,
 *     activeFontFamily,
 *     canToggle,
 *     fontFamilies,
 *   } = useFontFamilyDropdownMenu()
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
 * function MyAdvancedFontFamilyDropdown() {
 *   const {
 *     isVisible,
 *     activeFontFamily,
 *   } = useFontFamilyDropdownMenu({
 *     editor: myEditor,
 *     fontFamilies: customFontFamilies,
 *     defaultFontFamily: "Inter",
 *     hideWhenUnavailable: true,
 *   })
 *
 *   // component implementation
 * }
 * ```
 */
export function useFontFamilyDropdownMenu(
  config?: UseFontFamilyDropdownMenuConfig
) {
  const {
    editor: providedEditor,
    fontFamilies = FONT_FAMILIES,
    defaultFontFamily = "Inter",
    hideWhenUnavailable = false,
  } = config || {}

  const { editor } = useTiptapEditor(providedEditor)
  const [isVisible, setIsVisible] = useState(true)
  const [activeFontFamily, setActiveFontFamily] = useState<string>("")

  const isActive = isFontFamilyActive(editor)
  const canToggle = canToggleFontFamily(editor)

  useEffect(() => {
    if (!editor) return

    const handleSelectionUpdate = () => {
      setIsVisible(shouldShowDropdown({ editor, hideWhenUnavailable }))
      setActiveFontFamily(getActiveFontFamily(editor))
    }

    handleSelectionUpdate()

    editor.on("selectionUpdate", handleSelectionUpdate)
    editor.on("update", handleSelectionUpdate)

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate)
      editor.off("update", handleSelectionUpdate)
    }
  }, [editor, hideWhenUnavailable])

  // Applies a font family (or unsets it for the empty "Default" value). The
  // primary mutation, so a custom UI can act without touching the editor.
  const handleSelectFontFamily = useCallback(
    (fontFamily: string) => {
      if (!editor || !canToggle) return false
      if (fontFamily === "") {
        return editor.chain().focus().unsetFontFamily().run()
      }
      return editor.chain().focus().setFontFamily(fontFamily).run()
    },
    [editor, canToggle]
  )

  // The label to show on the trigger: the applied font (or the document default
  // when nothing inline is set), resolved to its display label.
  const displayFontFamily = activeFontFamily || defaultFontFamily
  const activeLabel =
    fontFamilies.find((family) => family.value === displayFontFamily)?.label ||
    displayFontFamily ||
    "Font"

  return {
    isVisible,
    activeFontFamily,
    isActive,
    canToggle,
    fontFamilies,
    defaultFontFamily,
    /** Apply a font family; `""` unsets it. Returns `true` on success. */
    handleSelectFontFamily,
    /** Display label for the trigger, derived from the active/default font. */
    activeLabel,
    label: "Font Family",
  }
}
