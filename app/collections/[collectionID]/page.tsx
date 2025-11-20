import { getProductsByCategory } from "@/lib/prinful";
import ProductCard from "@/components/shared/ProductCard";
import { Product } from "@/lib/types";

export default async function Page({
    params,
  }: {
    params: Promise<{ collectionID: string }>;
  }) {
    const { collectionID } = await params;
    const products = await getProductsByCategory(collectionID);
  
    return (
      <>

      <h1 className="p-3 text-3xl font-bold text-center text-[#266ae8] capitalize">{collectionID}</h1>
      {/* {error && <div className="text-red-500 text-center font-bold">API Error: {error}</div>} */}

      <div className="grid gap-6 grid-cols-4 mx-auto max-w-7xl px-4 py-10">
        {products.map((product: Product ) => (
            <ProductCard key={product.sync_product.id} product={product} />
        ))}
        
        {products.length === 0 && (
            <div className="col-span-full text-center py-10">
                <p className="text-gray-500 text-lg">No products found in this collection.</p>
            </div>
        )}
     </div>
     
    </>
    );
  }
  