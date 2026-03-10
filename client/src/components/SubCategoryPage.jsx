import { useParams } from "react-router-dom";
import  products  from "./Product";
import { motion } from "framer-motion";

const SubCategoryPage = ({ addToWishlist, addToCart }) => {
  const { id, sub } = useParams();

  const filtered = products.filter(
    (p) => p.category === id && p.sub === sub
  );

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-10 md:px-20">

      <h1 className="text-4xl mb-16 capitalize">
        {sub.replace("-", " ")}
      </h1>

      <div className="grid md:grid-cols-3 gap-10">

        {filtered.map((product) => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.05 }}
            className="bg-[#111] rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-72 w-full object-cover"
            />

            <div className="p-6">
              <h2 className="text-xl mb-2">{product.name}</h2>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-lg">₹ {product.price}</span>
                <span className="line-through text-gray-500">
                  ₹ {product.oldPrice}
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-6">
                {product.description}
              </p>

              <div className="flex gap-3">
                <button className="flex-1 bg-[#c9a27d] text-black py-2 rounded-lg">
                  Buy Now
                </button>

                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 border border-white py-2 rounded-lg hover:bg-white hover:text-black transition"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => addToWishlist(product)}
                  className="w-10 border border-white rounded-lg hover:bg-white hover:text-black transition"
                >
                  ♥
                </button>
              </div>

            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
};

export default SubCategoryPage;