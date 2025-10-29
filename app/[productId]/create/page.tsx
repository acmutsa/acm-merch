export default async function Page({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  return (
    <div>
      <h1>Create {productId}</h1>
    </div>
  );
}