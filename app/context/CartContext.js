// CartContext.js

import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialCartState = { items: [] };

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.cheeseId === action.payload.cheeseId);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.cheeseId === action.payload.cheeseId ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.cheeseId !== action.payload.cheeseId),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.cheeseId === action.payload.cheeseId ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return <CartContext.Provider value={{ state, dispatch }}>
    {children}
  </CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
