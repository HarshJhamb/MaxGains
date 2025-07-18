import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination } from 'swiper/modules';

const BestS = () => {
  const [supplements, setSupplements] = useState([]);
const navigate = useNavigate();
  useEffect(() => {
    fetch('/data/product.json') // ✅ fetch from public folder
      .then(res => res.json())
      .then(data => setSupplements(data.supplements))
      .catch(err => console.error('Failed to fetch supplements:', err));
  }, []);

  

  return (
    <div className="bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto mt-24 px-8 py-12">
        <h1 className="text-center mb-12 text-4xl font-bold tracking-tight text-white">
          Best Supplements in India
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
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          className="mySwiper"
        >
          {supplements.map((supplement) => (
            <SwiperSlide key={supplement.id}>
              <div className="bg-gray-900 rounded-2xl shadow-xl p-8 text-center flex flex-col justify-between w-full max-w-sm h-full border border-gray-800 hover:-translate-y-2 transition-transform hover:shadow-2xl mx-auto">
                <img 
                  src={supplement.image} 
                  alt={supplement.name} 
                  className="w-full rounded-xl mb-6 hover:scale-105 transition-transform"
                />
                <h3 className="text-2xl font-bold mb-4 text-white">{supplement.name}</h3>
                <p className="text-red-400 text-xl mb-5 font-semibold">₹{supplement.defaultPrice.toLocaleString()}</p>
                <p className="text-gray-500 text-sm mb-6 italic">Brand: {supplement.brand}</p>
                <button 
                  className="bg-gradient-to-r from-white via-black to-slate-950 text-white py-3 px-8 rounded-lg text-xl w-full hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50"
                  onClick={() => navigate(`/product/${supplement.id}`)} // 👈 Go to Product page
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

export default BestS;
