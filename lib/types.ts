export type SyncProduct = {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  thumbnail_url: string;
  is_ignored: boolean;
};

export type Product = {
  syncProduct: SyncProduct;
  syncVariants: SyncVariant[];
};

export type SyncVariant = {
  id: number;
  external_id: string;
  sync_product_id: number;
  name: string;
  synced: boolean;
  variant_id: number;
  retail_price: string;
  currency: string;
  sku: string;
  product: {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
  };
  files: {
    type: string;
    id: number;
    url: string;
    options: { id: string; value: string }[];
    hash: string;
    filename: string;
    mime_type: string;
    size: number;
    width: number;
    height: number;
    dpi: number;
    status: string;
    created: number;
    thumbnail_url: string;
    preview_url: string;
    visible: boolean;
    is_temporary: boolean;
    stitch_count_tier: string;
  }[];
  options: { id: string; value: string }[];
  main_category_id: number;
  warehouse_product_id: number;
  warehouse_product_variant_id: number;
  size: string;
  color: string;
  availability_status: string;
};

export type FilterBy =
  | "all"
  | "price"
  | "variants"
  | "category"
  | "availability";

export type SortBy =
  | "lowestPrice"
  | "highestPrice"
  | "alphabeticalAsc"
  | "alphabeticalDesc";
