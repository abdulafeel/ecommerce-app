import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const MemberCheckout = () => {
  const { user } = useAuth0();

  return (
    <div className="container mt-5" style={{ minHeight: "80vh" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              {user ? (
                <>
                  <h2 className="card-title mb-4">Member Checkout</h2>
                  <Link to="/checkout" className="btn btn-primary">
                    Proceed to Checkout
                  </Link>
                </>
              ) : (
                <>
                  <p className="card-text">
                    Please log in or register to proceed with the member
                    checkout.
                  </p>
                  <div className="d-flex">
                    <Link to="/login" className="btn btn-primary me-2">
                      Login
                    </Link>
                    <Link to="/register" className="btn btn-secondary">
                      Register
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCheckout;
