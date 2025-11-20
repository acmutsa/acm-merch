import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { getProductsByCategory } from "@/lib/prinful";

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

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto max-w-7xl px-4 py-10 place-content-center">
        {products.map((product) => (
            <Card key={product.syncProduct.id} className="hover:scale-105 transition-transform duration-200 w-72 h-80 border-[#266ae8]">
            <CardHeader>
                <CardTitle className="truncate text-lg" title={product.syncProduct.name}>{product.syncProduct.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-48 p-4">
              <img src={product.syncProduct.thumbnail_url} alt={product.syncProduct.name} className="max-h-full max-w-full object-contain"/>
            </CardContent>
            </Card>
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
  