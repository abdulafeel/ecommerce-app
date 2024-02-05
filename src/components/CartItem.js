// CartItem.js
import React from 'react';

const CartItem = ({ item }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <p>{item.name}</p>
      <p>${item.price}</p>
      {/* Add a remove button or quantity input */}
    </div>
  );
}

export default CartItem;
