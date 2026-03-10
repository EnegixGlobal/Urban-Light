import { useParams } from "react-router-dom";
import { products } from "./Product";

const ProductDetails = () => {

  const { productId } = useParams();

  const product = products.find(
    (p) => p.id === Number(productId)
  );

  if (!product) {
    return <div className="pt-40 text-white">Product Not Found</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen pt-32 px-10">

      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[500px] object-cover"
        />

        <div>

          <h1 className="text-4xl mb-6">
            {product.name}
          </h1>

          <p className="text-2xl text-[#c9a27d] mb-4">
            ₹{product.price}
          </p>

          <p className="opacity-70 mb-6">
            Premium quality wall light perfect for modern interiors.
          </p>

          <button className="bg-[#c9a27d] text-black px-8 py-3 rounded-full">
            Add To Cart
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;