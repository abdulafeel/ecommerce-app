import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Button, Form } from "react-bootstrap";
import OrderModal from "../components/OrderModal";
import { useAuth0 } from "@auth0/auth0-react";

export default function Checkout() {
  const { cart, getGrandTotal } = useCart();
  const {  user } = useAuth0();

  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: user?.given_name || user?.nickname || "",
    email: user?.email || "",
    addressLine: "",
    country: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    handleShow();
  };

  return (
    <div className="row g-5 mt-2 mx-2">
      <div className="col-md-5 col-lg-4 order-md-last">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-primary">Your cart</span>
          <span className="badge bg-primary rounded-pill">{cart.length}</span>
        </h4>
        {cart.map((item) => (
          <ul className="list-group mb-3" key={item.id}>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">{item.name}</h6>
                <small className="text-body-secondary">
                  Quantity: {item.quantity}
                </small>
              </div>
              <span className="text-body-secondary">₹ {item.price}</span>
            </li>
          </ul>
        ))}
        <ul className="list-group mb-3">
          <li className="list-group-item d-flex justify-content-between">
            <span>Total (INR)</span>
            <strong>₹ {getGrandTotal()}</strong>
          </li>
        </ul>
      </div>

      <div className="col-md-7 col-lg-8" >
        <h4 className="mb-3">Billing address</h4>
        <Form onSubmit={handlePlaceOrder}>
          <div className="row g-3">
            <div className="col-sm-6">
              <label for="fullName" className="form-label">
                Full name
              </label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                required
                value={deliveryAddress.fullName}
                onChange={handleAddressChange}
              />
              <div className="invalid-feedback">
                Valid full name is required.
              </div>
            </div>

            <div className="col-12">
              <label for="email" className="form-label">
                Email <span className="text-body-secondary">(Optional)</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="you@example.com"
                onChange={handleAddressChange}
                value={deliveryAddress.email}
              />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div className="col-12">
              <label for="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="addressLine"
                name="addressLine"
                placeholder="1234 Main St"
                required
                onChange={handleAddressChange}
              />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="col-12">
              <label for="address2" className="form-label">
                Address 2{" "}
                <span className="text-body-secondary">(Optional)</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="address2"
                placeholder="Apartment or suite"
              />
            </div>

            <div className="col-md-5">
              <label for="country" className="form-label">
                Country
              </label>
              <select className="form-select" id="country" name="country" required>
                <option value="">Choose...</option>
                <option>United States</option>
              </select>
              <div className="invalid-feedback">
                Please select a valid country.
              </div>
            </div>

            <div className="col-md-4">
              <label for="state" className="form-label">
                State
              </label>
              <select className="form-select" id="state" name="state" required>
                <option value="">Choose...</option>
                <option>California</option>
              </select>
              <div className="invalid-feedback">
                Please provide a valid state.
              </div>
            </div>

            <div className="col-md-3">
              <label for="zip" className="form-label">
                Zip
              </label>
              <input
                type="number"
                className="form-control"
                id="zipCode"
                name="zipCode"
                placeholder="574201"
                required
                maxLength={6}
              />
              <div className="invalid-feedback">Zip code required.</div>
            </div>
          </div>

          <hr className="my-4" />

          <Button className="w-100 btn btn-primary btn-lg" type="submit">
            Place Order
          </Button>
        </Form>
        <OrderModal show={showModal} handleClose={handleClose} name={deliveryAddress.fullName} />
      </div>
    </div>
  );
}
