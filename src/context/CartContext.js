import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      console.log("Item added to cart: Context", action.payload);
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case "REMOVE_FROM_CART":
      console.log("Item removed from cart: Context", action.payload);
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_CART_ITEM_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    // Handle other actions like 'CLEAR_CART', etc.
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  const [state, dispatch] = useReducer(cartReducer, { cartItems: storedCart });

  const addToCart = (item) => dispatch({ type: "ADD_TO_CART", payload: item });
  const removeFromCart = (productId) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });

  const updateCartItemQuantity = (itemId, newQuantity) => {
    dispatch({
      type: "UPDATE_CART_ITEM_QUANTITY",
      payload: { id: itemId, quantity: newQuantity },
    });
  };

  const getGrandTotal = () => {
    return state.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const contextValue = {
    cart: state.cartItems,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    getGrandTotal,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
