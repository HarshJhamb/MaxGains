import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const updateCart = (items) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const changeSize = (id, newSize) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        const sizeObj = item.sizes.find((s) => s.size === newSize);
        const newPrice = sizeObj ? sizeObj.price : item.defaultPrice || item.price;
        return {
          ...item,
          selectedSize: newSize,
          price: newPrice,
        };
      }
      return item;
    });
    updateCart(updated);
  };

  const increaseQuantity = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQuantity = (id) => {
    const updated = cartItems
      .map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty 🛒</h1>
          <button
            className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 text-white py-3 px-8 rounded-lg text-lg hover:scale-105 transition-all"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 pt-28">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-center">🛒 Your Shopping Cart</h1>
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row bg-gray-900 rounded-xl shadow-lg p-6 gap-6"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full md:w-48 h-48 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{item.name}</h2>
                {/* Size Selection */}
                {item.sizes && item.sizes.length > 0 && (
                  <div className="mb-2">
                    <label className="mr-2 text-gray-400">Size:</label>
                    <select
                      value={item.selectedSize}
                      onChange={(e) => changeSize(item.id, e.target.value)}
                      className="bg-gray-800 text-gray-200 px-3 py-1 rounded-lg"
                    >
                      {item.sizes.map((sizeObj) => (
                        <option key={sizeObj.size} value={sizeObj.size}>
                          {sizeObj.size}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <p className="text-green-400 text-xl font-semibold mb-2">
                  ₹{item.price.toLocaleString()}
                </p>
                <p className="text-gray-400 mb-4">
                  Brand: {item.brand || "Unknown"}
                </p>
                {/* Quantity Controls */}
                <div className="flex items-center gap-4">
                  <button
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                  <button
                    className="ml-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-all"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="mt-10 bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">🧾 Order Summary</h2>
          <div className="flex justify-between text-lg mb-4">
            <span>Total Items:</span>
            <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold text-green-400">
            <span>Total Amount:</span>
            <span>₹{totalAmount.toLocaleString()}</span>
          </div>
          <div className="mt-6 flex gap-4">
            <button
              className="flex-1 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 text-white py-3 rounded-lg text-lg hover:scale-105 transition-all"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
            <button
              className="flex-1 bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-lg text-lg hover:scale-105 transition-all"
              onClick={() => alert("Proceeding to Checkout 🚀")}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
