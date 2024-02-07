import React from "react";
import { MdOutlineMotionPhotosAuto } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Footer() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/wishlist", label: "Wishlist" },
    { to: "/cart", label: "Cart" },
    {
      action: isAuthenticated ? handleLogout : loginWithRedirect,
      label: isAuthenticated ? "Sign out" : "Sign in",
    },
  ];

  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <p className="col-md-4 mb-0 text-body-secondary">© 2023 Company, Inc</p>

        <Link
          to="/"
          className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <MdOutlineMotionPhotosAuto size={50} />
        </Link>

        <ul className="nav col-md-4 justify-content-end">
          {navItems.map((item, index) => (
            <li key={index} className="nav-item">
              {item.to ? (
                <Link
                  to={item.to}
                  className="nav-link px-2 text-body-secondary"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  className="nav-link px-2 text-body-secondary"
                  onClick={item.action}
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </footer>
    </div>
  );
}
