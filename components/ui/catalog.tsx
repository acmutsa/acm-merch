type StoreProduct = {
  name: string;
  thumbnail_url?: string;
};

type StoreVariant = {
  id: number;
  name: string;
  size?: string;
  retail_price?: string;
};

type PreviewImage = {
  url?: string;
  src?: string;
};

type CatalogInfo = {
  description?: string;
  product?: {
    description?: string;
  };
  techniques?: string[];
  preview_images?: PreviewImage[];
};

type CatalogDisplayProps = {
  storeProduct?: StoreProduct;
  storeVariants?: StoreVariant[];
  catalog: CatalogInfo;
};

export default function CatalogDisplay({
  storeProduct,
  storeVariants = [],
  catalog,
}: CatalogDisplayProps) {
  return (
    <div className="border rounded p-4 space-y-4">
      {storeProduct?.name && (
        <h2 className="text-2xl font-bold">{storeProduct.name}</h2>
      )}

      {/* Store thumbnail */}
      {storeProduct?.thumbnail_url && (
        <img
          src={storeProduct.thumbnail_url}
          alt={storeProduct.name}
          className="w-32 h-32 object-cover rounded"
        />
      )}

      {/* Catalog Description */}
      {(catalog.description || catalog.product?.description) && (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: catalog.description || catalog.product?.description || "",
          }}
        />
      )}

      {/* STORE VARIANTS (this is what YOU want) */}
      <section>
        <h3 className="font-semibold text-lg">Store Variants</h3>
        <ul className="list-disc ml-6">
          {storeVariants.length ? (
            storeVariants.map((variant) => (
              <li key={variant.id}>
                {variant.name} — {variant.size || "N/A"} — $
                {variant.retail_price || "N/A"}
              </li>
            ))
          ) : (
            <li>No store variants found.</li>
          )}
        </ul>
      </section>

      {/* Catalog Info */}
      <section>
        <h3 className="font-semibold text-lg">Catalog Product Info</h3>
        <p>
          <strong>Techniques:</strong>{" "}
          {catalog.techniques?.length ? catalog.techniques.join(", ") : "None"}
        </p>

        {/* Catalog Preview Images */}
        <div className="flex gap-2 flex-wrap">
          {catalog.preview_images?.map((img: PreviewImage, i: number) => (
            <img
              key={i}
              className="w-24 h-24 object-cover rounded border"
              src={img.url || img.src}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
