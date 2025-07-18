import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { CartContext } from "./CartContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [otherProducts, setOtherProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("/data/product.json")
      .then((res) => res.json())
      .then((data) => {
        const allProducts = Object.values(data).flat();
        const foundProduct = allProducts.find(
          (p) => p.id === parseInt(id) || p.id === id
        );
        setProduct(foundProduct);

        if (foundProduct) {
          const similar = allProducts.filter(
            (p) => p.id !== foundProduct.id
          );
          setSimilarProducts(similar.slice(0, 6));

          const shuffled = similar.sort(() => 0.5 - Math.random());
          setOtherProducts(shuffled.slice(0, 8));

          if (foundProduct.sizes) {
            const sizesArray = getSizesArray(foundProduct.sizes);
            setSelectedSize(sizesArray[0]?.size);
            setCurrentPrice(sizesArray[0]?.price || foundProduct.defaultPrice || foundProduct.price);
          } else {
            setCurrentPrice(foundProduct.defaultPrice || foundProduct.price);
          }
        }
      })
      .catch((err) => console.error("Failed to load product:", err));
  }, [id]);

  const getSizesArray = (sizes) => {
    if (Array.isArray(sizes)) return sizes;
    return Object.keys(sizes).map((key) => ({
      size: key,
      price: sizes[key],
    }));
  };

  const handleSizeSelect = (size, price) => {
    setSelectedSize(size);
    setCurrentPrice(price);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("⚠️ Please select a size before adding to cart!");
      return;
    }
    const productWithSize = {
      ...product,
      selectedSize,
      price: currentPrice,
    };
    addToCart(productWithSize);
    alert(`✅ Added ${product.name} (${selectedSize}) to Cart!`);
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <h1 className="text-3xl font-bold">Product not found 😢</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 pt-28">
      {/* Product Details Section */}
      <div className="container mx-auto px-6 flex flex-col md:flex-row gap-10 justify-center items-center">
        {/* Image Slider */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            className="rounded-2xl overflow-hidden shadow-2xl w-[80%]"
          >
            {[product.image, product.image2, product.image3]
              .filter(Boolean)
              .map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-[600px] object-cover rounded-2xl mx-auto"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 w-full bg-[#111827] p-8 rounded-2xl shadow-xl">
          <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
          <p className="text-2xl text-green-400 font-semibold mb-3">
            ₹{currentPrice}
          </p>
          <p className="text-gray-400 mb-4">
            Brand: {product.brand || "No brand available."}
          </p>
          <p className="text-gray-400 mb-6">
            {product.description || "No description available."}
          </p>

          {/* Size Selection */}
          {product.sizes && getSizesArray(product.sizes).length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Select Size:</h3>
              <div className="flex gap-2 flex-wrap">
                {getSizesArray(product.sizes).map(({ size, price }) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size, price)}
                    className={`py-2 px-4 rounded-lg border ${
                      selectedSize === size
                        ? "bg-green-500 text-white border-green-700"
                        : "bg-gray-800 text-gray-300 border-gray-600"
                    } hover:bg-green-600 transition`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-black via-gray-500 to-white hover:from-gray-900 hover:to-gray-300 text-black font-bold py-3 px-8 rounded-lg w-full transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="bg-black text-white mt-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">👀 Similar Products</h2>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              loop={true}
              centeredSlides={true}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="mySwiper"
            >
              {similarProducts.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="bg-gray-900 rounded-2xl shadow-xl p-6 text-center hover:-translate-y-2 transition-transform hover:shadow-2xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-[300px] object-cover rounded-xl mb-4"
                    />
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-red-400 text-lg mb-1 font-semibold">
                      ₹{item.defaultPrice || item.price}
                    </p>
                    <button
                      className="bg-gradient-to-r from-white via-black to-slate-950 text-white py-2 px-6 rounded-lg text-lg hover:scale-105 transition-all"
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      View Product
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {/* 🔥 Other Products */}
      {otherProducts.length > 0 && (
        <div className="bg-black text-white mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">🔥 Other Products You May Like</h2>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              loop={true}
              centeredSlides={true}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="mySwiper"
            >
              {otherProducts.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="bg-gray-900 rounded-2xl shadow-xl p-6 text-center hover:-translate-y-2 transition-transform hover:shadow-2xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-[300px] object-cover rounded-xl mb-4"
                    />
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-red-400 text-lg mb-1 font-semibold">
                      ₹{item.defaultPrice || item.price}
                    </p>
                    <button
                      className="bg-gradient-to-r from-white via-black to-slate-950 text-white py-2 px-6 rounded-lg text-lg hover:scale-105 transition-all"
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      View Product
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
