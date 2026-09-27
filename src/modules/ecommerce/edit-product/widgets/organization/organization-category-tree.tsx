"use client";

import { useState } from "react";

import { ArrowLeft, ArrowRight, ChevronDown, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import type { Category, CategoryPathItem, OrganizationLocale } from "./types";

type OrganizationCategoryTreeProps = {
  categories: Category[];
  selectedPath: CategoryPathItem[];
  locale: OrganizationLocale;
  placeholder: string;
  addLabel: string;
  onSelect: (category: Category) => void;
  onAdd: (name: string) => void;
};

type CategoryTreeItemProps = {
  category: Category;
  level: number;
  selectedPath: CategoryPathItem[];
  locale: OrganizationLocale;
  onSelect: (category: Category) => void;
};

function getName(
  item: { name: { en: string; fa: string } },
  locale: OrganizationLocale,
) {
  return item.name[locale];
}

function CategoryTreeItem({
  category,
  level,
  selectedPath,
  locale,
  onSelect,
}: CategoryTreeItemProps) {
  const [expanded, setExpanded] = useState(
    selectedPath.some((item) => item.id === category.id),
  );

  const selected = selectedPath.some((item) => item.id === category.id);
  const hasChildren = category.children.length > 0;

  function handleToggle() {
    onSelect(category);

    if (hasChildren) {
      setExpanded(true);
    }
  }

  return (
    <div>
      <div
        className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted"
        style={{ paddingInlineStart: `${level * 20 + 8}px` }}
      >
        {hasChildren ? (
          <button
            type="button"
            className="flex size-5 shrink-0 items-center justify-center rounded-sm bg-secondary hover:bg-background"
            onClick={() => setExpanded((current) => !current)}
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4 rtl:rotate-180" />
            )}
          </button>
        ) : (
          <span className="size-5 shrink-0" />
        )}

        <Checkbox
          className="border border-foreground/15"
          checked={selected}
          onCheckedChange={handleToggle}
        />

        <button
          type="button"
          onClick={handleToggle}
          className="min-w-0 flex-1 text-start text-sm"
        >
          {getName(category, locale)}
        </button>
      </div>

      {expanded && hasChildren && (
        <div>
          {category.children.map((child) => (
            <CategoryTreeItem
              key={child.id}
              category={child}
              level={level + 1}
              selectedPath={selectedPath}
              locale={locale}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function OrganizationCategoryTree({
  categories,
  selectedPath,
  locale,
  placeholder,
  addLabel,
  onSelect,
  onAdd,
}: OrganizationCategoryTreeProps) {
  const [inputValue, setInputValue] = useState("");

  function handleAdd() {
    const value = inputValue.trim();

    if (!value) {
      return;
    }

    onAdd(value);
    setInputValue("");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    handleAdd();
  }

  return (
    <div className="space-y-2">
      <div className="max-h-80 overflow-y-auto">
        {categories.map((category) => (
          <CategoryTreeItem
            key={category.id}
            category={category}
            level={0}
            selectedPath={selectedPath}
            locale={locale}
            onSelect={onSelect}
          />
        ))}
      </div>

      <div className="border-t border-foreground/15 pt-2">
        <div className="flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="h-9 flex-1 border border-foreground/15"
          />

          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={handleAdd}
            aria-label={addLabel}
            title={addLabel}
          >
            {locale === "fa" ? (
              <ArrowLeft className="size-4" />
            ) : (
              <ArrowRight className="size-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
