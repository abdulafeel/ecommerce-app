// Checkout.js
import React from 'react';
import { useCart } from '../context/CartContext';
import CheckoutForm from '../components/CheckoutForm';

const Checkout = () => {
  const { cart } = useCart();

  return (
    <div>
      <h2>Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. Add some items before checking out.</p>
      ) : (
        <div>
          <p>Total Items: {cart.length}</p>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <CheckoutForm />
        </div>
      )}
    </div>
  );
};

export default Checkout;
