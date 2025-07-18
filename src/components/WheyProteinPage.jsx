import React from "react";

const WheyProteinPage = () => {
  const products = [
    { id: "wp1", name: "Optimum Nutrition Whey", brand: "ON", price: "$40", image: "https://via.placeholder.com/150?text=ON+Whey" },
    { id: "wp2", name: "MyProtein Whey", brand: "MyProtein", price: "$35", image: "https://via.placeholder.com/150?text=MyProtein+Whey" },
    { id: "wp3", name: "MuscleBlaze Whey", brand: "MuscleBlaze", price: "$30", image: "https://via.placeholder.com/150?text=MuscleBlaze+Whey" },
    { id: "wp4", name: "Dymatize Whey", brand: "Dymatize", price: "$45", image: "https://via.placeholder.com/150?text=Dymatize+Whey" },
    { id: "wp5", name: "NitroTech Whey", brand: "MuscleTech", price: "$50", image: "https://via.placeholder.com/150?text=NitroTech+Whey" },
    { id: "wp6", name: "BSN Syntha-6", brand: "BSN", price: "$55", image: "https://via.placeholder.com/150?text=BSN+Whey" },
    { id: "wp7", name: "Isopure Zero Carb", brand: "Isopure", price: "$60", image: "https://via.placeholder.com/150?text=Isopure+Whey" },
    { id: "wp8", name: "Rule 1 Whey", brand: "Rule 1", price: "$40", image: "https://via.placeholder.com/150?text=Rule+1+Whey" },
    { id: "wp9", name: "Gold Standard Whey", brand: "ON", price: "$42", image: "https://via.placeholder.com/150?text=Gold+Standard+Whey" },
    { id: "wp10", name: "Universal Nutrition Whey", brand: "Universal", price: "$37", image: "https://via.placeholder.com/150?text=Universal+Whey" },
  ];

  return (
  
   
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Whey Protein Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="shadow-lg rounded-2xl">
            <div className="flex flex-col items-center p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold text-gray-800 text-center">{product.name}</h3>
              <p className="text-sm text-gray-600 text-center">{product.brand}</p>
              <p className="text-green-600 font-bold text-center">{product.price}</p>
              <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WheyProteinPage;