import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/api.js";
import Footer from "../components/Footer.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading products...</p>;

  return (
    <div className="bg-gray-50 min-h-screen px-6 md:px-12 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-primary tracking-wide">
        Our Products
      </h1>

      {/* Responsive grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.length > 0 ? (
          products.map((p) => (
            <div
              key={p._id}
              className="bg-white border rounded shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-200"
            >
              <Link to={`/products/${p._id}`}>
                <img
                  src={p.image || "https://via.placeholder.com/400"}
                  alt={p.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
              </Link>

              <div className="p-4 flex flex-col justify-between h-40">
                <h3 className="text-lg font-semibold truncate">{p.name}</h3>
                <p className="text-primary font-bold">KES {p.price}</p>

                {p.stock <= 0 ? (
                  <p className="text-red-600 text-sm">Out of stock</p>
                ) : p.stock <= 5 ? (
                  <p className="text-yellow-700 text-sm">
                    ⚠ Only {p.stock} left — order soon!
                  </p>
                ) : null}

                <div className="mt-3">
                  <Link
                    to={`/products/${p._id}`}
                    className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}