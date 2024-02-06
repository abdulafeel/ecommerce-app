import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function QuantityButtons({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={onDecrease}
      >
        <FaMinus />
      </button>
      <span className="btn btn-outline-secondary">{quantity}</span>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={onIncrease}
      >
        <FaPlus />
      </button>
    </div>
  );
}
