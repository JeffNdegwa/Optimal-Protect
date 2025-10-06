// frontend/src/contexts/CartContext.jsx
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // total
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Add product with qty (checks stock)
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i._id === product._id);
      if (existing) {
        const newQty = Math.min(existing.qty + qty, product.stock);
        if (newQty === existing.qty) {
          // no change (at limit)
          return prev;
        }
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: newQty } : item
        );
      } else {
        return [...prev, { ...product, qty: Math.min(qty, product.stock) }];
      }
    });
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qty: Math.min(item.qty + 1, item.stock) } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) => (item._id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const deleteFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        deleteFromCart,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
