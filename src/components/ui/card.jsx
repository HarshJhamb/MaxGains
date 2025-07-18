import React from "react";

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-[#111827] text-white p-4 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="text-gray-800">{children}</div>;
};
