export default async function Page({
  params,
}: {
  params: Promise<{ collectionId: string }>;
}) {
  const { collectionId } = await params;

  return (
    <div>
      <h1>{collectionId}</h1>
    </div>
  );
}
