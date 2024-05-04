import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(currentItems => {
      // Check if item already exists
      const itemIndex = currentItems.findIndex(ci => ci.cheeseId === item.cheeseId);
      if (itemIndex > -1) {
        // If exists, update the quantity
        const newItems = [...currentItems];
        newItems[itemIndex].quantity += item.quantity;
        return newItems;
      }
      // If not exists, add new item
      return [...currentItems, item];
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
