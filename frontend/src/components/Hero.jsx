// frontend/src/components/Hero.jsx
import { Link } from "react-router-dom";
import hero from '../assets/hero.png';

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center h-[600px] flex items-start"
      style={hero ? { backgroundImage: `url(${hero})` } : {}}
    >
      <div className="ml-12 mt-32 max-w-lg text-white">
        <h1 className="text-6xl md:text-7xl font-bold mb-4">OPTIMAL PROTECT</h1>
        <p className="text-lg mb-1">Quality personal protective equipment</p>
        <p className="text-lg mb-6">
          Call: 123-456-789 <br></br>
          Email: info@optimalprotect.com
        </p>
        <Link
          to="/products"
          className="bg-[#19A0EC] hover:bg-blue-700 px-8 py-3 rounded text-white font-bold mt-32 ml-12 text-center"
        >
          Start Shopping
        </Link>
      </div>
    </section>
  );
}
