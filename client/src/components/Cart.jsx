import { motion } from "framer-motion";
import { useState } from "react";

const Cart = () => {
  const [cart, setCart] = useState([
    // Example product (remove later)
    {
      id: 1,
      name: "Modern Pendant Light",
      price: 4999,
      image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
      quantity: 1,
    },
  ]);

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-6 md:px-20">

      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-light mb-16"
      >
        Your Cart
      </motion.h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-400 text-xl">
          Your cart is empty.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-12">

          {/* CART ITEMS */}
          <div className="md:col-span-2 space-y-8">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row gap-6 bg-[#1a1a1a] p-6 rounded-2xl"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-40 h-40 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h2 className="text-xl mb-2">{item.name}</h2>
                  <p className="text-gray-400 mb-4">₹ {item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mb-4">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
                    >
                      -
                    </button>

                    <span className="text-lg">{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-[#4b3b2c] p-8 rounded-2xl h-fit">
            <h2 className="text-2xl mb-6">Order Summary</h2>

            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span>₹ {totalPrice}</span>
            </div>

            <button className="w-full bg-black py-4 rounded-lg hover:bg-white hover:text-black transition">
              Proceed to Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;