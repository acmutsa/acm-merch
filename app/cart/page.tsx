'use client';
import { useEffect,useState } from 'react';
import { Trash2 } from 'lucide-react'; 

export default function Page() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  type CartItem = {
    id: string;
    printfulProductID: string;
    printfulVariantID: string;
    stripeProdID: string;
    stripePriceID: number;
    name: string;
    price: number;
    size?: string;
    quantity: number;
  };
  

  useEffect(() => {
    async function loadCart() {
      try {
        const res = await fetch("/api/cart");
        const data = (await res.json()) as CartItem[];
        setCartItems(data);
      } catch (err) {
        console.error("Failed to load cart", err);
      } finally {
        setLoading(false);
      }
    }

    loadCart();
  }, []);

  function mapCartItemForCheckout(item: CartItem) {
    return {
      printfulProductId: Number(item.printfulProductID),
      printfulVariantId: Number(item.printfulVariantID),
      retailPrice: item.price.toFixed(2),
      name: item.name,
      size: item.size ?? "Unknown",
      color: "Navy",
      quantity: item.quantity
    };
  }

  async function handleCheckout() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems.map(mapCartItemForCheckout)
      })
    });

    const data = await res.json();
    window.location.href = data.url;
  }  

  async function setQuantity(id: string, size: string | undefined, quantity: number) {
    const res = await fetch("/api/cart", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, size, quantity }),
    });
    if (!res.ok) {
      console.error("Failed to update quantity");
      return;
    }
    const data = (await res.json()) as CartItem[];
    setCartItems(data);
  }

  async function removeItem(id: string, size?: string) {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, size }),
    });
    if (!res.ok) {
      console.error("Failed to remove item");
      return;
    }
    const data = (await res.json()) as CartItem[];
    setCartItems(data);
  }

  const increaseQty = (item: CartItem) =>
    setQuantity(item.id, item.size, item.quantity + 1);

  const decreaseQty = (item: CartItem) =>
    setQuantity(item.id, item.size, item.quantity - 1);

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  if(loading) {
    return (<p className="text-center mt-10">Loading cart...</p>);
  }
  
  return (
    <>
      <div className="flex flex-col max-w-3xl mx-auto mt-12 mb-20 px-6 py-12 rounded-xl border shadow-sm bg-white">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Cart</h1>

  
        <section className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size ?? "nosize"}`}
              className="flex justify-between items-center border-b pb-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src="/assets/logo.png"
                  alt={item.name}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>

    
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => decreaseQty(item)}
                      className=" text-gray-700 font-bold flex items-center justify-center cursor-pointer"
                    >
                      −
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item)}
                      className=" text-gray-700 font-bold flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

           
              <div className="flex flex-col items-end gap-2">
                <p className="font-semibold text-lg">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.id, item.size)}
                  className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 transition"
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
              <button className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 font-semibold transition text-xl"
              onClick={handleCheckout}
              >
                Check Out
              </button>
          </div>
        )}
      </div>
    </>
  );
}
