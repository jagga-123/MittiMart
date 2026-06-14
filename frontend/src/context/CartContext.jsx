import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('mittimart-cart');
      return saved ? JSON.parse(saved) : [{ slug: "madhubani-painting-lord-ganesha", qty: 1 }];
    } catch {
      return [{ slug: "madhubani-painting-lord-ganesha", qty: 1 }];
    }
  });

  useEffect(() => {
    localStorage.setItem('mittimart-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (slug, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.slug === slug);
      if (existing) {
        return prev.map((item) =>
          item.slug === slug ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { slug, qty }];
    });
  };

  const adjustCart = (slug, delta) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.slug === slug);
      if (!existing) return prev;
      const nextQty = existing.qty + delta;
      if (nextQty < 1) {
        return prev.filter((item) => item.slug !== slug);
      }
      return prev.map((item) =>
        item.slug === slug ? { ...item, qty: nextQty } : item
      );
    });
  };

  const removeFromCart = (slug) => {
    setCart((prev) => prev.filter((item) => item.slug !== slug));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        adjustCart,
        removeFromCart,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
