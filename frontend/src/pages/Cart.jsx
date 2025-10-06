// frontend/src/pages/Cart.jsx
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../services/api.js";


export default function Cart() {
  const { cart, increaseQty, decreaseQty, deleteFromCart, clearCart, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="p-6">
        <p>Your cart is empty. <Link to="/products" className="text-blue-600">Continue shopping</Link></p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      <ul className="space-y-4">
        {cart.map((item) => (
          <li key={item._id} className="flex justify-between items-center border-b pb-2">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">KES {item.price}</p>

              <div className="flex items-center mt-2 gap-6">
                <button onClick={() => decreaseQty(item._id)} className="px-3 py-1 bg-gray-200 rounded">-</button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(item._id)} className="px-3 py-1 bg-gray-200 rounded" disabled={item.qty >= item.stock}>+</button>
                <span className="text-xs text-gray-500 ml-3">{item.stock <= 5 ? `Only ${item.stock} left` : `In stock: ${item.stock}`}</span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="font-semibold">KES {(item.price * item.qty).toFixed(2)}</span>
              <button onClick={() => deleteFromCart(item._id)} className="text-red-600 mt-2">Remove</button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between items-center">
        <p className="font-bold text-xl">Total: KES {cartTotal.toFixed(2)}</p>
        <div className="flex gap-2">
          <button onClick={() => navigate("/products")} className="bg-blue-600 text-white px-4 py-2 rounded">Continue Shopping</button>
          <button onClick={() => navigate("/checkout")} className="bg-green-600 text-white px-4 py-2 rounded">Proceed to Checkout</button>
        </div>
      </div>

      <div className="mt-4">
        <button onClick={() => clearCart()} className="text-sm text-gray-500">Clear cart</button>
      </div>
    </div>
  );
}
