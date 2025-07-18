import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import "./App.css";

const NAv = () => {
  const { cartCount } = useContext(CartContext); // 👈 get cartCount

  return (
    <div className="nav">
      <Link to="/" className="logo">
        <img src="src/images/logo22.png" alt="Logo" />
      </Link>
      <div className="search-container">
        <div className="search-box">
          <span className="material-symbols-outlined">search</span>
          <input
            type="text"
            className="search-box2"
            placeholder="What are you looking for....."
          />
        </div>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">
          <span className="jaja">
            <button>Login</button>
          </span>
        </Link>
        <Link to="/Cart">
          <div className="cart">
            <img src="src/images/cart.Img.png" alt=" " />
            <div className="NAVCARTCOUNT">{cartCount}</div> {/* 👈 show cart count */}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NAv;
