"use client";

import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";

import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Redo2,
  Strikethrough,
  Undo2,
} from "lucide-react";
import type { ContentEditorDictionary } from "@/components/ui/content-editor/dictionary";
import { ContentEditorIconButton } from "@/components/ui/content-editor/icon-button";

type BasicInformationToolbarProps = {
  editor: Editor | null;
  dictionary: ContentEditorDictionary;
};

export function BasicInformationToolbar({
  editor,
  dictionary,
}: BasicInformationToolbarProps) {
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) {
        return {
          canUndo: false,
          canRedo: false,
          isBold: false,
          isItalic: false,
          isStrike: false,
          isBulletList: false,
          isOrderedList: false,
        };
      }

      return {
        canUndo: editor.can().undo(),
        canRedo: editor.can().redo(),
        isBold: editor.isActive("bold"),
        isItalic: editor.isActive("italic"),
        isStrike: editor.isActive("strike"),
        isBulletList: editor.isActive("bulletList"),
        isOrderedList: editor.isActive("orderedList"),
      };
    },
  });

  if (!editor || !editorState) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-1 p-0">
      <ContentEditorIconButton
        type="button"
        variant={editorState.isBold ? "secondary" : "ghost"}
        size="icon"
        tooltip={dictionary.bold}
        aria-label={dictionary.bold}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <Bold className="size-4" />
      </ContentEditorIconButton>

      <ContentEditorIconButton
        type="button"
        variant={editorState.isItalic ? "secondary" : "ghost"}
        size="icon"
        tooltip={dictionary.italic}
        aria-label={dictionary.italic}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        <Italic className="size-4" />
      </ContentEditorIconButton>

      <ContentEditorIconButton
        type="button"
        variant={editorState.isStrike ? "secondary" : "ghost"}
        size="icon"
        tooltip={dictionary.strikethrough}
        aria-label={dictionary.strikethrough}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="size-4" />
      </ContentEditorIconButton>

      <div className="mx-1 h-5 w-px bg-border" />

      <ContentEditorIconButton
        type="button"
        variant={editorState.isBulletList ? "secondary" : "ghost"}
        size="icon"
        tooltip={dictionary.bulletList}
        aria-label={dictionary.bulletList}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="size-4" />
      </ContentEditorIconButton>

      <ContentEditorIconButton
        type="button"
        variant={editorState.isOrderedList ? "secondary" : "ghost"}
        size="icon"
        tooltip={dictionary.orderedList}
        aria-label={dictionary.orderedList}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="size-4" />
      </ContentEditorIconButton>

      <div className="mx-1 h-5 w-px bg-border" />

      <ContentEditorIconButton
        type="button"
        variant="ghost"
        size="icon"
        tooltip={dictionary.undo}
        aria-label={dictionary.undo}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editorState.canUndo}
      >
        <Undo2 className="size-4" />
      </ContentEditorIconButton>

      <ContentEditorIconButton
        type="button"
        variant="ghost"
        size="icon"
        tooltip={dictionary.redo}
        aria-label={dictionary.redo}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editorState.canRedo}
      >
        <Redo2 className="size-4" />
      </ContentEditorIconButton>
    </div>
  );
}
