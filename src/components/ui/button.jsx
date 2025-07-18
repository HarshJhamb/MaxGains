import React from "react";

export const Button = ({ children, variant, onClick }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium focus:outline-none transition";
  const variants = {
    solid: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant] || ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
