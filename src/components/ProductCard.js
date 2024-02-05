import React, { useState, useEffect } from "react";
import { FaHeart, FaCartPlus } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastConfig = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: true,
};

const WishlistButton = ({ currentProduct, index, isInWishlist, onClick }) => (
  <li className="me-auto">
    <FaHeart
      size={26}
      color={isInWishlist(currentProduct) ? "red" : "lightgrey"}
      onClick={() => onClick(currentProduct, index)}
    />
  </li>
);

const BuyNowButton = ({ currentProduct, index, onClick }) => (
  <li className="d-flex align-items-center">
    <button type="button" className="btn btn-primary" onClick={() => onClick(currentProduct, index)}>
      Buy Now
      <FaCartPlus size={20} className="m-1" />
    </button>
  </li>
);

const ProductCard = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { cart, addToCart, updateCartItemQuantity } = useCart();
  const [showAddedToCart, setShowAddedToCart] = useState(Array(product.length).fill(false));
  const [showAddedToWishlist, setShowAddedToWishlist] = useState(Array(product.length).fill(false));

  useEffect(() => {
    product.forEach((_, index) => {
      if (showAddedToCart[index]) {
        toast.success("Added to Cart!", toastConfig);
      }

      if (showAddedToWishlist[index]) {
        toast.success(
          isInWishlist(product[index]) ? "Added to Wishlist!" : "Removed from Wishlist!",
          toastConfig
        );
      }
    });
  }, [showAddedToCart, showAddedToWishlist, product, isInWishlist]);

  const handleToggleWishlist = (currentProduct, index) => {
    const isInWishlistAlready = isInWishlist(currentProduct);

    if (isInWishlistAlready) {
      removeFromWishlist(currentProduct);
    } else {
      addToWishlist(currentProduct);
    }

    setShowAddedToWishlist((prev) => {
      const updatedStates = [...prev];
      updatedStates[index] = true;
      return updatedStates;
    });

    setTimeout(() => {
      setShowAddedToWishlist((prev) => {
        const updatedStates = [...prev];
        updatedStates[index] = false;
        return updatedStates;
      });
    }, 2000);
  };

  const handleAddToCart = (currentProduct, index) => {
    const existingCartItem = cart.find((item) => item.id === currentProduct.id);
    const updatedQuantity = existingCartItem ? existingCartItem.quantity + 1 : 1;

    if (existingCartItem) {
      updateCartItemQuantity(currentProduct.id, updatedQuantity);
    } else {
      addToCart({ ...currentProduct, quantity: updatedQuantity });
    }

    setShowAddedToCart((prev) => {
      const updatedStates = [...prev];
      updatedStates[index] = true;
      return updatedStates;
    });

    setTimeout(() => {
      setShowAddedToCart((prev) => {
        const updatedStates = [...prev];
        updatedStates[index] = false;
        return updatedStates;
      });
    }, 2000);
  };

  return (
    <>
      <ToastContainer {...toastConfig} />
      <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
        {product.map((currentProduct, index) => (
          <div className="col" key={index}>
            <div
              className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg position-relative"
              style={{
                backgroundImage: `url(${currentProduct.image})`,
                backgroundSize: "cover",
              }}
            >
              <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                <div style={{ color: "#919779" }}>
                  <h3 className="pt-5 mt-5 mb-5 display-6 lh-1 fw-bold">
                    {currentProduct.name}
                  </h3>
                  <h6>₹ {currentProduct.price}</h6>
                  <p style={{ color: "#919779" }}>
                    {currentProduct.description}
                  </p>
                </div>
                <ul className="d-flex list-unstyled mt-auto">
                  <WishlistButton
                    currentProduct={currentProduct}
                    index={index}
                    isInWishlist={isInWishlist}
                    onClick={handleToggleWishlist}
                  />
                  <BuyNowButton
                    currentProduct={currentProduct}
                    index={index}
                    onClick={handleAddToCart}
                  />
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductCard;
