import { motion } from "framer-motion";

const Wishlist = ({ wishlist, removeFromWishlist }) => {
  return (
    <div className="min-h-screen bg-black text-white pt-28 px-6 md:px-20">

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-light">
          Your Wishlist
        </h1>
        <p className="text-gray-400 mt-4">
          Save your favorite luxury lighting pieces.
        </p>
      </motion.div>

      {/* Empty State */}
      {wishlist.length === 0 ? (
        <div className="text-center mt-20">
          <div className="text-6xl mb-6">♡</div>
          <h2 className="text-2xl mb-4">Your wishlist is empty</h2>
          <p className="text-gray-400">
            Browse products and add your favorites.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">

          {wishlist.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#4b3b2c] rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition duration-500"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">
                <h2 className="text-xl mb-2">{item.name}</h2>
                <p className="text-gray-300 mb-6">₹ {item.price}</p>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="w-full py-3 border border-white rounded-lg hover:bg-white hover:text-black transition"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Wishlist;