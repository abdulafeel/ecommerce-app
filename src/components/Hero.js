import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export default function Hero() {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const greeting = `Hey ${user?.given_name || user?.nickname || "User"}!`;

  return (
    <div className="container my-5">
      <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
        <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis">
            {isAuthenticated ? greeting : "Welcome to Our Shop!"}
          </h1>
          <h6 className="display-6  lh-1 text-body-emphasis">
            Your Personalized Shopping Haven
          </h6>
          <p className="lead">
            Discover the ultimate gateway to seamless iPhone shopping on our
            app. Crafted with precision and tailored for mobile-first
            interactions, our platform ensures a responsive and intuitive
            experience that puts you in control.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
            <Link to="#products" className="btn btn-dark btn-lg px-4 me-md-2 fw-bold">
              Explore
            </Link>
          </div>
        </div>
        <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
          <img
            className="rounded-lg-3"
            src="heroImage.jpg"
            alt=""
            width="720"
          />
        </div>
      </div>
    </div>
  );
}
