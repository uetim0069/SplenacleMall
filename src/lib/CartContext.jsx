import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const CART_KEY = 'vvm_cart';
const SAVED_KEY = 'vvm_saved';

const read = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => read(CART_KEY));
  const [saved, setSaved] = useState(() => read(SAVED_KEY));

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved]);

  const value = useMemo(() => {
    const addToCart = (product, months) => {
      const key = `${product.id}-${months}`;
      setCart((prev) => {
        const found = prev.find((item) => item.key === key);
        if (found) {
          return prev.map((item) =>
            item.key === key ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [
          ...prev,
          {
            key,
            product_id: product.id,
            name: product.name,
            price: product.price,
            image_url: product.image_url,
            category: product.category,
            min_months: product.min_months || 3,
            max_months: product.max_months || 12,
            months,
            quantity: 1,
          },
        ];
      });
    };

    const setPlan = (key, months) => {
      setCart((prev) =>
        prev.map((item) =>
          item.key === key ? { ...item, key: `${item.product_id}-${months}`, months } : item
        )
      );
    };

    const setQuantity = (key, quantity) => {
      setCart((prev) =>
        prev
          .map((item) => (item.key === key ? { ...item, quantity } : item))
          .filter((item) => item.quantity > 0)
      );
    };

    const removeFromCart = (key) => setCart((prev) => prev.filter((item) => item.key !== key));
    const clearCart = () => setCart([]);

    const toggleSaved = (product) => {
      setSaved((prev) => {
        const exists = prev.some((item) => item.id === product.id);
        if (exists) return prev.filter((item) => item.id !== product.id);
        return [...prev, product];
      });
    };

    const isSaved = (id) => saved.some((item) => item.id === id);

    return {
      cart,
      saved,
      addToCart,
      setPlan,
      setQuantity,
      removeFromCart,
      clearCart,
      toggleSaved,
      isSaved,
      cartCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      cartTotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };
  }, [cart, saved]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
