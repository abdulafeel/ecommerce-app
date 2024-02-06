import React from "react";
import { FaHeart } from "react-icons/fa";

export default function WishlistButton({
  currentProduct,
  index,
  isInWishlist,
  onClick,
}) {
  return (
    <li className="me-auto">
      <FaHeart
        size={26}
        color={isInWishlist(currentProduct) ? "red" : "lightgrey"}
        onClick={() => onClick(currentProduct, index)}
      />
    </li>
  );
}
