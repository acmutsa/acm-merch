'use client';
import { useState } from 'react';
import { Trash2 } from 'lucide-react'; 

export default function Page() {
    //many things to rip out this data and its functions exists just for PoC
  const [cartItems, setCartItems] = useState([
    { id: 1, productName: "RowdyHacks Tee", price: 29.99, size: "XL", thumbnailURL: "/assets/logo.png", count: 2 },
    { id: 2, productName: "Datathon Hat", price: 21.99, size: "O/S", thumbnailURL: "/assets/logo.png", count: 1 },
    { id: 3, productName: "CQ Beanie", price: 24.99, size: "O/S", thumbnailURL: "/assets/logo.png", count: 1 },
    { id: 4, productName: "Projects Backpack", price: 39.99, size: "O/S", thumbnailURL: "/assets/logo.png", count: 2 },
  ]);
   async function handleCheckout() {
    const res = await fetch("/api/checkout", {
      method: "POST"
    });

    const data = await res.json();
    window.location.href = data.url;
  }

  const increaseQty = (id: number) => {
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, count: item.count + 1 } : item))
    );
  };

  const decreaseQty = (id: number) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, count: Math.max(0, item.count - 1) } : item
        )
        .filter(item => item.count > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.count, 0).toFixed(2);

  return (
    <>
      <div className="flex flex-col max-w-3xl mx-auto mt-12 mb-20 px-6 py-12 rounded-xl border shadow-sm bg-white">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Cart</h1>

  
        <section className="flex flex-col gap-4">
          {cartItems.map(item => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.thumbnailURL}
                  alt={item.productName}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.productName}</h3>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>

    
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className=" text-gray-700 font-bold flex items-center justify-center cursor-pointer"
                    >
                      −
                    </button>
                    <span className="w-6 text-center">{item.count}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className=" text-gray-700 font-bold flex items-center justify-center cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

           
              <div className="flex flex-col items-end gap-2">
                <p className="font-semibold text-lg">
                  ${(item.price * item.count).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
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
            
                <button className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 font-semibold transition text-xl" onClick={handleCheckout}>
                Check Out
                </button>

          </div>
        )}
      </div>
    </>
  );
}
