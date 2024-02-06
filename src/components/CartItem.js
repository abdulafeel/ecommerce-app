import React from "react";
import { FaTrash } from "react-icons/fa";
import QuantityButtons from "./QuantityButtons";

export default function CartItem({
  item,
  quantity,
  onQuantityChange,
  onRemoveFromCart,
}) {
  return (
    <div className="col" key={item.id}>
      <div className="card h-100">
        <img src={item.image} className="card-img-top" alt={item.name} />
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.description}</p>
          <p className="card-text">₹{item.price}</p>
          <div className="d-flex justify-content-between align-items-center">
            <QuantityButtons
              quantity={quantity}
              onIncrease={() => onQuantityChange(item.id, "increase")}
              onDecrease={() => onQuantityChange(item.id, "decrease")}
            />
            <p className="card-text">Total: ₹{item.price * quantity}</p>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onRemoveFromCart(item.id)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
