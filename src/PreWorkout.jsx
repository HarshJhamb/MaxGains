import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PreWorkout = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/product.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.preworkout); // ✅ Access preworkout array
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
        setLoading(false);
      });
  }, []);

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] p-6">
      <div className="backdrop-blur-lg mt-24 bg-black/30 border border-yellow-400/20 rounded-2xl shadow-2xl p-8 w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-yellow-300 drop-shadow-md">
            ⚡ Pre-Workout Boosters
          </h1>
          <button
            onClick={goBack}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            ← Back
          </button>
        </div>

        {loading ? (
          <div className="text-center text-white text-xl animate-pulse">
            Loading pre-workouts...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-900 rounded-2xl shadow-xl p-6 text-center flex flex-col justify-between border border-gray-800 hover:-translate-y-2 transition-transform hover:shadow-2xl"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full rounded-xl mb-6 hover:scale-105 transition-transform"
                />
                <h3 className="text-2xl font-bold mb-3 text-white">
                  {product.name}
                </h3>
                <p className="text-red-400 text-lg mb-2 font-semibold">
                  ₹{product.defaultPrice.toLocaleString()}
                </p>
                <p className="text-gray-500 text-sm italic mb-4">
                  Brand: {product.brand}
                </p>
                <button
                  className="bg-gradient-to-r from-white via-black to-slate-950 text-white py-3 px-8 rounded-lg text-lg w-full hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreWorkout;
