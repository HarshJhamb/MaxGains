import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom"; // 👈 Added
import { Card, CardContent } from "../components/ui/card";

const Shop = () => {
  const [selectedLevel, setSelectedLevel] = useState("beginner");
  const [products, setProducts] = useState({
    beginner: [],
    intermediate: [],
    advanced: [],
  });

  const navigate = useNavigate(); // 👈 Added

  useEffect(() => {
    fetch("/data/product.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch levels data:", err));
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="p-8 bg-black text-white">
      {/* Level selection buttons */}
      <div className="flex justify-center mb-8 space-x-4">
        {["beginner", "intermediate", "advanced"].map((level) => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-5 py-3 rounded-full text-white font-semibold shadow-lg transition-all duration-300 ${
              selectedLevel === level
                ? "bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:to-green-800"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      {/* Product carousel */}
      <Slider {...sliderSettings}>
        {products[selectedLevel]?.map((product) => (
          <div key={product.id} className="px-3">
            <Card className="bg-[#111827] rounded-2xl shadow-xl border border-gray-800 hover:-translate-y-2 transition-transform hover:shadow-2xl w-80 h-[470px]">
              <CardContent className="flex flex-col justify-between text-center p-6 h-full">
                {/* Image */}
                <div className="w-52 h-60 ml-10 overflow-hidden rounded-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                {/* Name */}
                <h3 className="text-xl mt-1 font-bold mb-2 text-white truncate">
                  {product.name}
                </h3>
                {/* Price */}
                <p className="text-red-400 text-xl font-semibold mb-1">
                  ₹{product.defaultPrice.toLocaleString()}
                </p>
                {/* Brand */}
                <p className="text-gray-400 text-sm italic mb-4">
                  Brand: {product.brand}
                </p>
                {/* Buy Button */}
                <button
                  onClick={() => navigate(`/product/${product.id}`)} // 👈 Go to Product page
                  className="bg-gradient-to-r from-white via-black to-slate-950 text-white py-3 px-6 rounded-lg text-lg w-full hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Buy Now
                </button>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Shop;
