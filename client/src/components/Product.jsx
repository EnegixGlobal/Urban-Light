import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* IMPORT IMAGES */

import img1 from "../assets/wall light/020A3232.JPG";
import img2 from "../assets/wall light/020A3233.JPG";
import img3 from "../assets/wall light/020A3235.JPG";
import img4 from "../assets/wall light/020A3236.JPG";
import img5 from "../assets/wall light/020A3237.JPG";
import img6 from "../assets/wall light/020A3238.JPG";
import img7 from "../assets/wall light/020A3241.JPG";
import img8 from "../assets/wall light/020A3247.JPG";
import img9 from "../assets/wall light/020A3248.JPG";
import img10 from "../assets/wall light/020A3249.JPG";
import img11 from "../assets/wall light/020A3274.JPG";
import img12 from "../assets/wall light/020A3277.JPG";
import img13 from "../assets/wall light/020A3278.JPG";
import img14 from "../assets/wall light/020A3279.JPG";
import img15 from "../assets/wall light/020A3281.JPG";
import img16 from "../assets/wall light/020A3282.JPG";
import img17 from "../assets/wall light/020A3283.JPG";
import img18 from "../assets/wall light/020A3285.JPG";


/* PRODUCT DATA */

export const products = [
  { id: 1, name: "Wall Light 3232", price: 3999, oldPrice: 5999, image: img1 },
  { id: 2, name: "Wall Light 3233", price: 3999, oldPrice: 5999, image: img2 },
  { id: 3, name: "Wall Light 3235", price: 3999, oldPrice: 5999, image: img3 },
  { id: 4, name: "Wall Light 3236", price: 3999, oldPrice: 5999, image: img4 },
  { id: 5, name: "Wall Light 3237", price: 3999, oldPrice: 5999, image: img5 },
  { id: 6, name: "Wall Light 3238", price: 3999, oldPrice: 5999, image: img6 },
  { id: 7, name: "Wall Light 3241", price: 3999, oldPrice: 5999, image: img7 },
  { id: 8, name: "Wall Light 3247", price: 3999, oldPrice: 5999, image: img8 },
  { id: 9, name: "Wall Light 3248", price: 3999, oldPrice: 5999, image: img9 },
  { id: 10, name: "Wall Light 3249", price: 3999, oldPrice: 5999, image: img10 },
  { id: 11, name: "Wall Light 3274", price: 3999, oldPrice: 5999, image: img11 },
  { id: 12, name: "Wall Light 3277", price: 3999, oldPrice: 5999, image: img12 },
  { id: 13, name: "Wall Light 3278", price: 3999, oldPrice: 5999, image: img13 },
  { id: 14, name: "Wall Light 3279", price: 3999, oldPrice: 5999, image: img14 },
  { id: 15, name: "Wall Light 3281", price: 3999, oldPrice: 5999, image: img15 },
  { id: 16, name: "Wall Light 3282", price: 3999, oldPrice: 5999, image: img16 },
  { id: 17, name: "Wall Light 3283", price: 3999, oldPrice: 5999, image: img17 },
  { id: 18, name: "Wall Light 3285", price: 3999, oldPrice: 5999, image: img18 },
];



const Product = () => {

  const navigate = useNavigate();
  const [sort, setSort] = useState("");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") return a.price - b.price;
    if (sort === "high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="bg-black text-white min-h-screen">

      {/* BANNER */}

      <div
        className="h-[350px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/banner/product-banner.jpg')" }}
      >
        <h1 className="text-5xl font-light">Products</h1>
      </div>


      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-4 gap-10">


        {/* PRODUCT GRID */}

        <div className="col-span-3 grid grid-cols-3 gap-8">

          {sortedProducts.map((product) => (

            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="cursor-pointer group"
            >

              <div className="overflow-hidden">

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[280px] object-cover group-hover:scale-105 transition duration-300"
                />

              </div>

              <h3 className="mt-4 text-lg">
                {product.name}
              </h3>

              <div className="flex gap-3 items-center mt-1">

                <span className="text-lg font-semibold">
                  ₹{product.price}
                </span>

                <span className="line-through text-gray-400">
                  ₹{product.oldPrice}
                </span>

              </div>

            </div>

          ))}

        </div>


        {/* SORT */}

        <div>

          <h3 className="text-lg mb-4">
            Sort By
          </h3>

          <select
            onChange={(e) => setSort(e.target.value)}
            className="bg-black border border-gray-600 p-2 w-full"
          >
            <option value="">Featured</option>
            <option value="low">Price Low → High</option>
            <option value="high">Price High → Low</option>
          </select>

        </div>

      </div>

    </div>
  );
};

export default Product;