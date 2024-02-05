import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { MdOutlineMotionPhotosAuto } from "react-icons/md";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { cart } = useCart();
  const { wishlist, resetWishlist } = useWishlist();
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    resetWishlist();
  };

  const navItems = [
    { to: "/", icon: FaHome, label: "Home" },
    { to: "/wishlist", icon: FaHeart, label: `Wishlist (${wishlist.length})` },
    { to: "/cart", icon: FaShoppingCart, label: `Cart (${cart.length})` },
  ];

  return (
    <div id="header" className="px-3 py-2 text-bg-dark border-bottom sticky-top">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to="/"
            className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
          >
            <MdOutlineMotionPhotosAuto
              className="bi me-2"
              width="40"
              height="32"
              size={50}
            />
          </Link>

          <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link to={item.to} className="nav-link text-white">
                  {React.createElement(item.icon, {
                    className: "bi d-block mx-auto mb-1",
                    width: "24",
                    height: "24",
                  })}
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                className="btn btn-link text-white"
                onClick={isAuthenticated ? handleLogout : loginWithRedirect}
              >
                <FaUser
                  className="bi d-block mx-auto mb-1"
                  width="24"
                  height="24"
                />
                {isAuthenticated ? "Sign out" : "Sign in"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
