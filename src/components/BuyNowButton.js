import React from "react";
import { FaCartPlus } from "react-icons/fa";

export default function BuyNowButton({ currentProduct, index, onClick }) {
  return (
    <li className="d-flex align-items-center">
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => onClick(currentProduct, index)}
      >
        Buy Now
        <FaCartPlus size={20} className="m-1" />
      </button>
    </li>
  );
}
