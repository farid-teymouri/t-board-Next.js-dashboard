"use client";

import { useState } from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { BasicInformationToolbar } from "./basic-information-toolbar";
import type { EcommerceEditProductDictionary } from "@/i18n/dictionaries";
import type { ContentEditorDictionary } from "@/components/ui/content-editor/dictionary";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { BasicInformationData } from "./types";

type BasicInformationFormProps = {
  dictionary: EcommerceEditProductDictionary["basicInformation"];
  contentEditorDictionary: ContentEditorDictionary;
  initialData: BasicInformationData;
};

export function BasicInformationForm({
  dictionary,
  initialData,
  contentEditorDictionary,
}: BasicInformationFormProps) {
  const [title, setTitle] = useState(initialData.title);
  const [handle, setHandle] = useState(initialData.handle);
  const [shortDescription, setShortDescription] = useState(
    initialData.shortDescription,
  );
  const [description, setDescription] = useState(initialData.description);

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialData.description,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML());
    },
  });
  console.log("description:", initialData.description);
  console.log("editor:", editor);
  return (
    <Card>
      <CardHeader>
        <h2 className="text-base font-semibold">{dictionary.title}</h2>
      </CardHeader>

      <CardContent>
        <div className="space-y-5">
          {/* Product title */}

          <div className="space-y-2">
            <Label htmlFor="product-title">
              {dictionary.productTitle}{" "}
              <span className="text-destructive">*</span>
            </Label>

            <Input
              id="product-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />

            {!title.trim() && (
              <p className="text-xs text-destructive">
                {dictionary.productTitleRequired}
              </p>
            )}
          </div>

          {/* URL handle */}

          <div className="space-y-2">
            <Label htmlFor="product-handle">{dictionary.urlHandle}</Label>

            <div
              className="flex items-center overflow-hidden rounded-md border bg-background"
              dir="ltr"
            >
              <span className="shrink-0 border-e bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                {dictionary.urlPrefix}
              </span>

              <Input
                id="product-handle"
                value={handle}
                onChange={(event) => setHandle(event.target.value)}
                className="border-0 shadow-none focus-visible:ring-0"
                dir="ltr"
              />
            </div>
          </div>

          {/* Short description */}

          <div className="space-y-2">
            <Label htmlFor="short-description">
              {dictionary.shortDescription}
            </Label>

            <Textarea
              id="short-description"
              value={shortDescription}
              onChange={(event) => setShortDescription(event.target.value)}
              maxLength={160}
              rows={3}
              className="resize-none"
            />

            <div className="flex justify-end">
              <span className="text-xs text-muted-foreground">
                {shortDescription.length} / 160 {dictionary.characters}
              </span>
            </div>
          </div>

          {/* Description */}

          <div className="space-y-2">
            <Label>{dictionary.description}</Label>
            <div className="overflow-hidden rounded-md border bg-background">
              <div className="flex flex-wrap gap-1 border-b p-2">
                {/* toolbar buttons */}
                <BasicInformationToolbar
                  editor={editor}
                  dictionary={contentEditorDictionary}
                />
              </div>
              {editor ? (
                <EditorContent
                  editor={editor}
                  className="
        min-h-64
        [&_.ProseMirror]:min-h-64
        [&_.ProseMirror]:p-4
        [&_.ProseMirror]:outline-none
        [&_.ProseMirror_p]:my-2
        [&_.ProseMirror_h1]:my-4
        [&_.ProseMirror_h1]:text-2xl
        [&_.ProseMirror_h1]:font-bold
        [&_.ProseMirror_h2]:my-3
        [&_.ProseMirror_h2]:text-xl
        [&_.ProseMirror_h2]:font-semibold
        [&_.ProseMirror_ul]:my-3
        [&_.ProseMirror_ul]:list-disc
        [&_.ProseMirror_ul]:ps-6
        [&_.ProseMirror_ol]:my-3
        [&_.ProseMirror_ol]:list-decimal
        [&_.ProseMirror_ol]:ps-6
      "
                />
              ) : (
                <div className="min-h-64 p-4 text-sm text-muted-foreground">
                  Editor loading...
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
