import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

const OrderModal = ({ show, handleClose, name }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <div className="modal-content rounded-4 shadow">
        <div className="modal-header border-bottom-0">
          <h1 className="modal-title fs-5">Order Confirmation: {name.toUpperCase()}!</h1>
          <button
            type="button"
            className="btn-close"
            onClick={handleClose}
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body py-0">
          <p>Thank you for placing your order! Your purchase has been successfully completed.</p>
        </div>
        <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
          <Link to="/cart" className="btn btn-lg btn-primary">
            Keep Shopping
          </Link>
          <Link to="/" className="btn btn-lg btn-secondary">
            Go Home
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default OrderModal;
