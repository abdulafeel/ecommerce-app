import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import CartItem from "../components/CartItem";

const Cart = () => {
  const { cart, updateCartItemQuantity, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState({});
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    const initialQuantityState = cart.reduce((acc, item) => {
      acc[item.id] = item.quantity || 1;
      return acc;
    }, {});
    setQuantity(initialQuantityState);
  }, [cart]);

  const handleQuantityChange = (productId, operation) => {
    setQuantity((prevQuantity) => {
      const updatedQuantity = { ...prevQuantity };

      if (operation === "increase") {
        updatedQuantity[productId] = (updatedQuantity[productId] || 1) + 1;
      } else if (operation === "decrease" && updatedQuantity[productId] > 1) {
        updatedQuantity[productId] -= 1;
      }

      updateCartItemQuantity(productId, updatedQuantity[productId]);
      return updatedQuantity;
    });
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    setQuantity((prevQuantity) => {
      const updatedQuantity = { ...prevQuantity };
      delete updatedQuantity[productId];
      return updatedQuantity;
    });
  };

  const calculateTotalItems = () =>
    cart.reduce((acc, item) => acc + (quantity[item.id] || 0), 0);

  const calculateGrandTotal = () =>
    cart.reduce((acc, item) => acc + item.price * (quantity[item.id] || 0), 0);

  return (
    <div className="container mt-5" style={{ minHeight: "80vh" }}>
      <h2 className="mb-4">Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="display-4">Your cart is empty</p>
          <p className="lead">Add some items before checking out.</p>
          <a className="btn btn-dark" href="/#products">
            Go to Products
          </a>
        </div>
      ) : (
        <div>
          <p>Total Items: {calculateTotalItems()}</p>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                quantity={quantity[item.id] || 1}
                onQuantityChange={handleQuantityChange}
                onRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </div>

          <div className="mt-4">
            <p>Grand Total: ₹{calculateGrandTotal()}</p>
            {isAuthenticated ? (
              <Link to="/checkout" className="btn btn-primary">
                Proceed with Checkout
              </Link>
            ) : (
              <>
                <Link to="/checkout-member" className="btn btn-primary me-2">
                  Member Checkout
                </Link>
                <Link to="/checkout" className="btn btn-secondary">
                  Guest Checkout
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
