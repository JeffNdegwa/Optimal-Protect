// frontend/src/pages/Checkout.jsx
import { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { createOrder } from "../services/api.js";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cart.length) return alert("Cart is empty.");

    setLoading(true);
    setError(null);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        cart,
        cartTotal,
      };

      const order = await createOrder(payload);

      clearCart();
      navigate(`/order-confirmation/${order._id}`);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} required placeholder="Full name" className="w-full border p-2 rounded" />
          <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email" className="w-full border p-2 rounded" />
          <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone" className="w-full border p-2 rounded" />
          <textarea name="address" value={form.address} onChange={handleChange} required placeholder="Address" className="w-full border p-2 rounded" rows={4} />
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded w-full">{loading ? "Placing order..." : `Place order (KES ${cartTotal.toFixed(2)})`}</button>
        </form>

        <div>
          <h3 className="font-semibold mb-3">Order Summary</h3>
          <ul className="space-y-2 border rounded p-4 max-h-80 overflow-y-auto">
            {cart.map((i) => (
              <li key={i._id} className="flex justify-between">
                <span>{i.name} x{i.qty}</span>
                <span>KES {(i.price * i.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-bold">Total: KES {cartTotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
