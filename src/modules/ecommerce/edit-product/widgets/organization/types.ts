export type OrganizationLocale = "en" | "fa";

export type LocalizedName = {
  en: string;
  fa: string;
};

export type Category = {
  id: string;
  name: LocalizedName;
  children: Category[];
};

export type CategoryPathItem = {
  id: string;
  name: LocalizedName;
};

export type Brand = {
  id: string;
  name: LocalizedName;
};

export type Vendor = {
  id: string;
  name: LocalizedName;
};

export type Collection = {
  id: string;
  name: LocalizedName;
  selected: boolean;
};

export type Tag = {
  id: string;
  name: LocalizedName;
};

export type OrganizationData = {
  categoryTree: Category[];
  selectedCategoryPath: CategoryPathItem[];
  brands: Brand[];
  selectedBrandId: string | null;
  vendors: Vendor[];
  selectedVendorId: string | null;
  collections: Collection[];
  availableTags: Tag[];
  selectedTagIds: string[];
};
