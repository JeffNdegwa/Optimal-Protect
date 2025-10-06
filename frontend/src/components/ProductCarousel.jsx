import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';

export default function ProductCarousel() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <div className="flex overflow-x-auto gap-4">
        {products.map(p => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
