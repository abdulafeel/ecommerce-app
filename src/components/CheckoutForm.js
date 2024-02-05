// CheckoutForm.js
import React, { useState } from 'react';

const CheckoutForm = () => {
  const [address, setAddress] = useState('');

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleCheckout = () => {
    // Implement the checkout logic, including the address
    console.log('Checking out with address:', address);
  };

  return (
    <div>
      <h3>Delivery Address</h3>
      <form>
        <label>Address:</label>
        <input type="text" value={address} onChange={handleAddressChange} />
        <button type="button" onClick={handleCheckout}>
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
