import React, { createContext, useContext, useReducer, useEffect } from "react";

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishlistItems: [...state.wishlistItems, action.payload],
      };
    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const localStorageWishlist = JSON.parse(
    localStorage.getItem("wishlist") || "[]"
  );

  const [state, dispatch] = useReducer(wishlistReducer, {
    wishlistItems: localStorageWishlist,
  });

  const addToWishlist = (item) => {
    dispatch({ type: "ADD_TO_WISHLIST", payload: item });
  };

  const removeFromWishlist = (item) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: item });
  };

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
  }, [state.wishlistItems]);

  const isInWishlist = (item) => {
    return state.wishlistItems.some(
      (wishlistItem) => wishlistItem.id === item.id
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist: state.wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
