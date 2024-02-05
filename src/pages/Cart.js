import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

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

  const calculateTotalItems = () => cart.reduce((acc, item) => acc + (quantity[item.id] || 0), 0);

  const calculateGrandTotal = () => cart.reduce((acc, item) => acc + item.price * (quantity[item.id] || 0), 0);

  return (
    <div className="container mt-5" style={{ minHeight: "100vh" }}>
      <h2 className="mb-4">Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="display-4">Your cart is empty</p>
          <p className="lead">Add some items before checking out.</p>
        </div>
      ) : (
        <div>
          <p>Total Items: {calculateTotalItems()}</p>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {cart.map((item) => (
              <div className="col" key={item.id}>
                <div className="card h-100">
                  <img src={item.image} className="card-img-top" alt={item.name} />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">${item.price}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => handleQuantityChange(item.id, "decrease")}
                        >
                          <FaMinus />
                        </button>
                        <span className="btn btn-outline-secondary">
                          {quantity[item.id] || 1}
                        </span>
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => handleQuantityChange(item.id, "increase")}
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <p className="card-text">
                        Total: ${item.price * (quantity[item.id] || 0)}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <p>Grand Total: ${calculateGrandTotal()}</p>
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
