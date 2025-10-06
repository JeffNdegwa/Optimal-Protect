import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderById } from "../services/api.js";

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data);
      } catch (err) {
        console.error(err);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!order) return <p className="p-6 text-red-600">Order not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Order Confirmed</h2>
      <p className="mb-2">Thank you! Your order has been placed.</p>
      <p className="mb-2">Order ID: <strong>{order._id}</strong></p>
      <p className="mb-4">Status: <strong>{order.status}</strong></p>

      <h3 className="font-semibold">Shipping To</h3>
      <p>{order.address}</p>
      <p>{order.name} — {order.phone} — {order.email}</p>

      <h3 className="font-semibold mt-4">Items</h3>
      <ul className="mt-2">
        {order.items.map((it) => (
          <li key={it.productId} className="flex justify-between">
            <span>{it.name} x{it.qty}</span>
            <span>KES {(it.price * it.qty).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 font-bold">Total: KES {order.total.toFixed(2)}</p>

      <div className="mt-6">
        <Link to="/products" className="bg-blue-600 text-white px-4 py-2 rounded">
          Back to shop
        </Link>
      </div>
    </div>
  );
}
