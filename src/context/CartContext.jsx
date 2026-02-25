import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cartCount = cart?.lignes?.reduce((sum, l) => sum + l.quantite, 0) || 0;

  // Charger le panier quand l'utilisateur est authentifié
  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await api.getCart();
      setCart(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = useCallback(async (produitId, uniteConditionnementId, quantite = 1) => {
    setError(null);
    try {
      const updatedCart = await api.addToCart(produitId, uniteConditionnementId, quantite);
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateQuantity = useCallback(async (ligneId, quantite) => {
    setError(null);
    try {
      const updatedCart = await api.updateCartItem(ligneId, quantite);
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const removeItem = useCallback(async (ligneId) => {
    setError(null);
    try {
      const updatedCart = await api.removeCartItem(ligneId);
      setCart(updatedCart);
      return updatedCart;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const clearCart = useCallback(async () => {
    setError(null);
    try {
      await api.clearCart();
      setCart(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const value = {
    cart,
    cartCount,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    fetchCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
