'use client';
import { useState } from 'react';
import { Trash2 } from 'lucide-react'; 

export default function Page() {
  const [cartItems, setCartItems] = useState([
    {
      printfulProductId: 403273920,
      printfulVariantId: 5065442581,
      retailPrice: "38.00",
      name: "CIC full zip hoodie",
      size: "M",
      color: "Navy",
      quantity: 1
    }
  ]);

  async function handleCheckout() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems })
    });

    const data = await res.json();
    window.location.href = data.url;
  }

  const increaseQty = (variantId: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.printfulVariantId === variantId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (variantId: number) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.printfulVariantId === variantId
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        )
    );
  };

  const removeItem = (variantId: number) => {
    setCartItems(prev =>
      prev.filter(item => item.printfulVariantId !== variantId)
    );
  };

  const total = cartItems
    .reduce((sum, item) => sum + parseFloat(item.retailPrice) * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="flex flex-col max-w-3xl mx-auto mt-12 mb-20 px-6 py-12 rounded-xl border shadow-sm bg-white">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Cart</h1>

      <section className="flex flex-col gap-4">
        {cartItems.map(item => (
          <div
            key={item.printfulVariantId}
            className="flex justify-between items-center border-b pb-3"
          >
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.color} / {item.size}
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => decreaseQty(item.printfulVariantId)}
                    className="text-gray-700 font-bold"
                  >
                    −
                  </button>
                  <span className="w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.printfulVariantId)}
                    className="text-gray-700 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <p className="font-semibold text-lg">
                ${(parseFloat(item.retailPrice) * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeItem(item.printfulVariantId)}
                className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} /> Remove
              </button>
            </div>
          </div>
        ))}

        {cartItems.length === 0 && (
          <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
        )}
      </section>

      {cartItems.length > 0 && (
        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-2xl font-bold">Total: ${total}</p>
          
          <button
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 font-semibold transition text-xl"
            onClick={handleCheckout}
          >
            Check Out
          </button>
        </div>
      )}
    </div>
  );
}
