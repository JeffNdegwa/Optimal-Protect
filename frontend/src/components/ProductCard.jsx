import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="border rounded shadow-sm p-4 bg-white flex flex-col hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="h-72 object-cover mb-2 rounded" />
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-primary font-semibold">KES {product.price}</p>
      <Link
        to={`/products/${product._id}`}
        className="mt-auto bg-primary text-white py-2 px-4 rounded text-center hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
}
