import { useParams, Link } from "react-router-dom";
import  categories  from "./Product";

const CategoryPage = () => {
  const { id } = useParams();
  const category = categories.find((cat) => cat.id === id);

  if (!category) return <div className="pt-40 text-white">Not Found</div>;

  return (
    <div className="bg-black min-h-screen text-white pt-32 px-10">
      <h1 className="text-4xl mb-10">{category.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {category.items.map((item) => (
          <Link
            key={item.slug}
            to={`/category/${id}/${item.slug}`}
            className="border border-gray-700 p-10 hover:bg-[#c9a27d] hover:text-black transition"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;