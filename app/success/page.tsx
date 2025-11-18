import { stripe } from "@/lib/stripe";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;
        const dummyCart = [
        {
            productId: 1111,      // temporary fake Printful product
            variantId: 2222,      // temporary fake variant
            quantity: 1
        },
        {
            productId: 3333,
            variantId: 4444,
            quantity: 2
        }
        ];
  if (!sessionId) return <div>No session ID provided</div>;

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  const items = session.line_items?.data ?? [];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-10">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful
        </h1>

        <p className="text-gray-700 mb-8">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        <div className="mb-6">
          <p className="text-sm text-gray-500">Order Number</p>
          <p className="font-semibold">3795HIDBHS</p>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b pb-3"
              >
                <div>
                  <p className="font-medium">{item.description}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                    
                  </p>
                </div>
                <p className="font-medium">
                  ${((item.amount_total ?? 0) / 100).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6 text-lg font-semibold">
            <p>Total</p>
            <p>${((session.amount_total ?? 0) / 100).toFixed(2)}</p>
          </div>

          <div className="mt-10 p-4 rounded-lg space-y-1">
                <p className="text-sm text-gray-500">Receipt sent to</p>

                <div className="flex justify-between items-center">
                    <p className="font-medium">
                    {session.customer_details?.email}
                    </p>

                    <a
                    href="/"
                    className="font-medium hover:underline"
                    >
                    Continue Shopping
                    </a>
                </div>
                </div>
        </div>
      </div>
    </div>
  );
}

