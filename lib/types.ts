export type SyncProduct = {
  id: number;
  externalId: string;
  name: string;
  variants: number;
  thumbnailUrl: string;
  isIgnored: boolean;
};

export type Product = {
  syncProduct: SyncProduct;
  syncVariants: SyncVariant[];
};

export type SyncVariant = {
  id: number;
  externalId: string;
  syncProductId: number;
  name: string;
  synced: boolean;
  variantId: number;
  retailPrice: string;
  currency: string;
  sku: string;
  product: {
    variantId: number;
    productId: number;
    image: string;
    name: string;
  };
  files: {
    type: string;
    id: number;
    url: string;
    options: [
      {
        id: string;
        value: string;
      }
    ];
    hash: string;
    filename: string;
    mimeType: string;
    size: number;
    width: number;
    height: number;
    dpi: number;
    status: string;
    created: number;
    thumbnailUrl: string;
    previewUrl: string;
    visible: boolean;
    isTemporary: boolean;
    stitchCountTier: string;
  }[];
  options: { id: string; value: string }[];
  mainCategoryId: number;
  warehouseProductId: number;
  warehouseProductVariantId: number;
  size: string;
  color: string;
  availabilityStatus: string;
};
