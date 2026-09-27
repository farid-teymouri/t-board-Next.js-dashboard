import en from "./en.json";
import fa from "./fa.json";

export type ContentEditorDictionary = {
  bold: string;
  italic: string;
  strikethrough: string;
  bulletList: string;
  orderedList: string;
  undo: string;
  redo: string;
};

export const contentEditorDictionaries: Record<
  "en" | "fa",
  ContentEditorDictionary
> = {
  en,
  fa,
};
