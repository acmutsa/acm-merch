export default async function Page({
    params,
  }: {
    params: Promise<{ orderID: string }>;
  }) {
    const { orderID } = await params;
  
    return (
      <div>
        <h1>OrderID: {orderID}</h1>
      </div>
    );
  }