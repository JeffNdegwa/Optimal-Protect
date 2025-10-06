import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import logo from '../assets/logo.png';

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  return (
        <nav className="bg-primary text-white p-4 flex items-center justify-between">
      {/* Clickable Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img
            src={logo}
            alt="Optimal Protect"
            className="h-16 mr-4 cursor-pointer"
          />
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 text-lg">
        {[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: 'About', path: '/about' },
          { name: 'Contact', path: '/contact' },
          { name: `Cart (${cart.length})`, path: '/cart' },
        ].map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className="transition-transform duration-200 hover:text-[#FFDF26] hover:scale-105"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setOpen(!open)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                open
                  ? 'M6 18L18 6M6 6l12 12'
                  : 'M4 6h16M4 12h16M4 18h16'
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="absolute right-4 top-16 bg-[#19A0EC] p-4 rounded shadow-md flex flex-col space-y-2 md:hidden z-50">
          {[
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
            { name: 'About', path: '/about' },
            { name: 'Contact', path: '/contact' },
            { name: `Cart (${cart.length})`, path: '/cart' },
          ].map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="transition-transform duration-200 hover:text-[#FFDF26] hover:scale-105 block"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
