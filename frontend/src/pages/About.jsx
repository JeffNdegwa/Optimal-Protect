import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";
import hero from '../assets/hero.png';

export default function About() {
  return (
    <div className="min-h-screen bg-[#f8f8f8] font-nunito">

      {/* Hero-sized about section */}
      <section
        className="relative bg-cover bg-center h-[600px] flex items-center"
        style={hero ? { backgroundImage: `url(${hero})` } : {}}
      >
        <div className="max-w-4xl ml-6 text-white">
          <h1 className="text-xl md:text-5xl font-bold leading-tight mb-4">
            About Optimal Protect
          </h1>
          <p className="text-lg md:text-lg max-w-lg mb-6">
           We are distributors of the highest quality Personal Protective Equipment (PPE) to ensure the highest level of safety in all your tasks, from head protection, face protection, hand protection, body protection and feet protection.
          </p>

          <div className="flex gap-4 items-center">
            <a
              href="/products"
              className="bg-[#19A0EC] hover:bg-blue-700 text-white px-6 py-3 rounded font-semibold"
            >
              Browse Products
            </a>

            <a
              href="mailto:info@optimalprotect.com"
              className="bg-white hover:bg-blue-700 text-black px-4 py-3 rounded font-semibold"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Body content */}
      <main className="max-w-5xl mx-auto px-6 md:px-0 py-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-4">Our Promise</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            At Optimal Protect, safety is not an afterthought - it’s the foundation.
            We carefully source and test every product to meet industry standards and deliver
            dependable performance. Whether you’re outfitting a construction site, a medical
            facility, or a small workshop, our range is selected to provide protection,
            comfort, and value.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Why choose us?</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Certified and tested PPE that meets recognized safety standards</li>
            <li>Competitive pricing and bulk-supply options for businesses</li>
            <li>Fast local delivery and responsive customer support</li>
            <li>Clear product information to help you pick the right gear</li>
          </ul>
        </section>

        <section className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="font-semibold mb-3">Get in touch</h4>
            <p className="text-gray-700 mb-2">Phone: +254 700 000 000</p>
            <p className="text-gray-700 mb-2">Email: info@optimalprotect.com</p>
            <p className="text-gray-700">Address: 123 Safety Ave, Nairobi, Kenya</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h4 className="font-semibold mb-3">Follow us</h4>
            <div className="flex gap-4 items-center">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-blue-800 underline">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-pink-600 underline">Instagram</a>
              <a href="https://wa.me/" target="_blank" rel="noreferrer" className="text-green-600 underline">WhatsApp</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
