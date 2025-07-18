import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartContext";
import NAv from "./NAv";
import App from "./App";
import Login from "./Login";
import Cart from "./Cart.jsx";
import Product from "./product.jsx";
import Recommedationsys from "./rcm.jsx";
import WheyProducts from "./WheyProducts.jsx";
import Creatine from "./creatine.jsx";
import RawWhey from "./RawWhey.jsx";
import Gainer from "./Gainer.jsx";
import Bcaa from "./components/ui/Bcaa.jsx";
import Multivitamins from "./multivitamins.jsx";
import More from "./more.jsx";
import PreWorkout from "./PreWorkout.jsx";

const brr = () => {
  return (
    <CartProvider>
    <>
      <NAv />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="/contact" element={<h1>Contact Page</h1>} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/product" element={<Product />} />
        <Route path="/recommendation" element={<Recommedationsys />} />
        <Route path="/WheyProducts" element={<WheyProducts />} />
        <Route path="/creatine" element={<Creatine />} />
        <Route path="/Gainer" element={<Gainer />} />
        <Route path="/RawWhey" element={<RawWhey />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/Bcaa" element={<Bcaa />} />
        <Route path="/multivitamins" element={<Multivitamins />} />
        <Route path="/PreWorkout" element={<PreWorkout />} />
         <Route path="/more" element={<More />} />
      </Routes>
    </>
    </CartProvider>
  );
};

export default brr;
