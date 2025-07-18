import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Added for navigation
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const Wavy = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // 👈 Added

  useEffect(() => {
    fetch("/data/product.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.whey)) // ✅ access whey array
      .catch((err) => console.error("Failed to load products:", err));
  }, []);

  return (
    <div className="bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto mt-24 px-8 py-12">
        <h1 className="text-center mb-12 text-4xl font-bold tracking-tight text-white">
          Best Whey of India
        </h1>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          centeredSlides={true}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1200: { slidesPerView: 4, spaceBetween: 30 },
          }}
          className="mySwiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-gray-900 rounded-2xl shadow-xl p-8 text-center flex flex-col justify-between w-full max-w-sm h-full border border-gray-800 hover:-translate-y-2 transition-transform hover:shadow-2xl mx-auto">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full rounded-xl mb-6 hover:scale-105 transition-transform"
                />
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {product.name}
                </h3>
                <p className="text-red-400 text-xl mb-5 font-semibold">
                  ₹{product.defaultPrice.toLocaleString()}
                </p>
                <p className="text-gray-500 text-sm mb-6 italic">
                  Brand: {product.brand}
                </p>
                <button
                  className="bg-gradient-to-r from-white via-black to-slate-950 text-white py-3 px-8 rounded-lg text-xl w-full hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                  onClick={() => navigate(`/product/${product.id}`)} // 👈 Navigate on click
                >
                  Buy Now
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Wavy;
