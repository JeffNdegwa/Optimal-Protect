import Hero from "../components/Hero.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { useState, useEffect } from "react";
import { getProducts } from "../services/api.js";
import Footer from "../components/Footer.jsx";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  return (
    <div className="bg-[#f8f8f8] min-h-screen font-nunito">
      <Hero />
      
      {/* Products Section */}
      <h2 className="text-3xl font-bold text-center mt-36 mb-6">Featured Products</h2>
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Map */}
      <section className="max-w-2xl mx-auto mt-16 mb-36 px-4 h-[550px]">
        <h2 className="text-3xl font-bold text-center mt-36 mb-6">Our Location</h2>
        <iframe
          title="Business Location"
          className="w-full h-full rounded shadow"
          src="https://www.google.com/maps/embed/v1/place?key=GOOGLE_MAPS_API_KEY&q=Optimal+Protect,Kenya"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </section>

      < Footer />
    </div>
  );
}
