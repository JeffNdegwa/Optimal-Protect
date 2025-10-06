import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Optimal Protect PPE</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/products" className="hover:underline">Products</Link>
        <Link to ="/about" className='hover:underline'>About</Link>
        <Link to="/login" className="hover:underline">Contact</Link>
        <Link to="/cart" className="hover:underline">Cart</Link>
      </nav>
    </header>
  );
}