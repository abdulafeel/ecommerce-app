import React, { createContext, useContext, useReducer } from "react";

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return { ...state, wishlistItems: [...state.wishlistItems, action.payload] };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(item => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { wishlistItems: [] });

  const addToWishlist = item => dispatch({ type: "ADD_TO_WISHLIST", payload: item });

  const removeFromWishlist = item =>
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: item });

  const isInWishlist = item =>
    state.wishlistItems.some(wishlistItem => wishlistItem.id === item.id);

  const contextValue = {
    wishlist: state.wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };

  return <WishlistContext.Provider value={contextValue}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
