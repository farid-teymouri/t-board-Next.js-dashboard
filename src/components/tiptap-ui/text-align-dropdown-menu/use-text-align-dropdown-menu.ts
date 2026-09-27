"use client"

import { useEffect, useState } from "react"
import type { Editor } from "@tiptap/react"

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- Icons ---
import { AlignLeftIcon } from "@/components/tiptap-icons/align-left-icon"

// --- Tiptap UI ---
import {
  textAlignIcons,
  type TextAlign,
  isTextAlignActive,
  canSetTextAlign,
  shouldShowButton,
} from "@/components/tiptap-ui/text-align-button"

/**
 * Stable default alignment list. Hoisted to module scope so the hook's
 * `alignments` default keeps a constant identity across renders — otherwise a
 * fresh array literal would re-fire the `selectionUpdate` effect every render.
 */
const DEFAULT_TEXT_ALIGNMENTS: TextAlign[] = [
  "left",
  "center",
  "right",
  "justify",
]

/**
 * Configuration for the text align dropdown menu functionality
 */
export interface UseTextAlignDropdownMenuConfig {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null
  /**
   * Available text alignment options to show in the dropdown
   * @default ["left", "center", "right", "justify"]
   */
  alignments?: TextAlign[]
  /**
   * Whether the dropdown should hide when text align is not available.
   * @default false
   */
  hideWhenUnavailable?: boolean
}

/**
 * Gets the currently active text alignment from the available alignments
 */
export function getActiveTextAlign(
  editor: Editor | null,
  alignments: TextAlign[] = DEFAULT_TEXT_ALIGNMENTS
): TextAlign | undefined {
  if (!editor || !editor.isEditable) return undefined
  return alignments.find((align) => isTextAlignActive(editor, align))
}

/**
 * Custom hook that provides text align dropdown menu functionality for Tiptap editor
 *
 * @example
 * ```tsx
 * // Simple usage
 * function MyTextAlignDropdown() {
 *   const {
 *     isVisible,
 *     activeAlign,
 *     isActive,
 *     canToggle,
 *     alignments,
 *   } = useTextAlignDropdownMenu()
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
 * function MyAdvancedTextAlignDropdown() {
 *   const {
 *     isVisible,
 *     activeAlign,
 *   } = useTextAlignDropdownMenu({
 *     editor: myEditor,
 *     alignments: ["left", "center", "right"],
 *     hideWhenUnavailable: true,
 *   })
 *
 *   // component implementation
 * }
 * ```
 */
export function useTextAlignDropdownMenu(
  config?: UseTextAlignDropdownMenuConfig
) {
  const {
    editor: providedEditor,
    alignments = DEFAULT_TEXT_ALIGNMENTS,
    hideWhenUnavailable = false,
  } = config || {}

  const { editor } = useTiptapEditor(providedEditor)
  const [isVisible, setIsVisible] = useState(true)

  const activeAlign = getActiveTextAlign(editor, alignments)
  const isActive = activeAlign !== undefined
  const canToggle = alignments.some((align) => canSetTextAlign(editor, align))

  useEffect(() => {
    if (!editor) return

    const handleSelectionUpdate = () => {
      const shouldShow = alignments.some((align) =>
        shouldShowButton({ editor, align, hideWhenUnavailable })
      )
      setIsVisible(shouldShow)
    }

    handleSelectionUpdate()

    editor.on("selectionUpdate", handleSelectionUpdate)

    return () => {
      editor.off("selectionUpdate", handleSelectionUpdate)
    }
  }, [editor, hideWhenUnavailable, alignments])

  return {
    isVisible,
    activeAlign,
    isActive,
    canToggle,
    alignments,
    label: "Text alignment",
    Icon: activeAlign ? textAlignIcons[activeAlign] : AlignLeftIcon,
  }
}
