import React, { useState, useEffect } from "react";
import "./app.css";
import Shop from "./components/shop.jsx";
import Wavy from "./components/wavy.jsx";
import BestS from "./components/bestS.jsx";
import WheyProducts from "./WheyProducts.jsx";
//import Button1 from "./components/button1.jsx";
import { Link } from "react-router-dom";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "//www.avvatarindia.com/images/banners/17167143971745509201.jpg",
    "//asitisnutrition.com/cdn/shop/files/WP_1.jpg?v=1738130083&width=1400",
    "//www.guardian.in/cdn/shop/files/Nitro_Surge_2c152b0c-5bf0-4396-a91b-e5ee94114b2a.jpg?v=1745329078&width=2800",
    "//asitisnutrition.com/cdn/shop/files/Banner_48.jpg?v=1741408512&width=1400",
    "src/images/bnr_3776923_o.webp",
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <div
        className="slider-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className="slide" key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="controls">
        <button className="control" onClick={handlePrev}>
          &#10094;
        </button>
        <button className="control" onClick={handleNext}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <>
      <div className="lowernav">
        <div className="inputss">
          <Link to ="/WheyProducts" className="a1">
            <img
              src="src/images/Gemini_Generated_Image_h3gxs2h3gxs2h3gx.jpeg"
              alt="Whey Protein"
              className="wheyImage1"
            />
            <span className="whey1">Whey Protein</span>
          </Link>
          <Link to ="/RawWhey" className="a1">
            <img
              src="src/images/Gemini_Generated_Image_kfc9vzkfc9vzkfc9.jpeg"
              alt="Raw Whey"
              className="suplimentImage"
            />
            <span className="RAwwhey">Raw Whey</span>
          </Link>
          <Link to = "/creatine" className="a1">
            <img
              src="src/images/Gemini_Generated_Image_9180g9180g9180g9.jpeg"
              alt="Creatine"
              className="suplimentImage"
            />
            <span className="RAwwhey">Creatine</span>
          </Link>
          <Link to = "/Bcaa"className="a1">
            <img
              src="src/images/bcaa.jpeg"
              alt="BCAA"
              className="suplimentImage"
            />
            <span className="RAwwhey">BCAA</span>
          </Link>
          <Link to = "/multivitamins" className="a1">
            <img
              src="src/images/Gemini_Generated_Image_3rjwrh3rjwrh3rjw.jpeg"
              alt="Multi Vitamins"
              className="suplimentImage"
            />
            <span className="RAwwhey2">Multi Vitamins</span>
          </Link>
          <Link to ="/Gainer"  className="a1">
            <img
              src="src/images/Gemini_Generated_Image_dwuch4dwuch4dwuc.jpeg"
              alt="Gainers"
              className="suplimentImage"
            />
            <span className="RAwwhey">Gainers</span>
          </Link>
          <Link to = "/PreWorkout" className="a1">
            <img
              src="src/images/Gemini_Generated_Image_s7xsw2s7xsw2s7xs.jpeg"
              alt="Pre-Workout"
              className="suplimentImage"
            />
            <span className="RAwwhey">Pre-Workout</span>
          </Link>
          <Link to = "/MultiVitamins" className="a1">
            <img
              src="src/images/Gemini_Generated_Image_3crx373crx373crx.jpeg"
              className="suplimentImage"
            /> 
            <Link to ="/more">More</Link>
         </Link>
        </div>
      </div>

      <div className="nav1">
        <span className="Navu">We only promote 100% authentic products</span>

        <div className="my-4 text-center">
          <Link to="/recommendation">
            <button
  className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-bold text-white rounded-full shadow-lg group bg-gradient-to-r from-white via-black to-slate-900 hover:from-slate-950 hover:to-white transition-all duration-500 ease-in-out"
>
  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
  <span className="relative z-10">✨ Get Recommendations</span>
</button>

          </Link>
        </div>

       
        <Slider />
      </div>

      <div className="ShopBYlevel mt-10">
        <span className=" greem1 text-center  text-4xl font-bold tracking-tight text-white ">Shop by Level</span>
        <div className="w-full">
          <Shop />
        </div>
        <div>
      <Wavy />
    </div>
        <BestS />
      </div>
    </>
  );
};

export default App;
