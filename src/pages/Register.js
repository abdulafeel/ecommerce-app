import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Register = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="container mt-5" style={{ minHeight: "100vh" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Create an Account</h2>
              <p className="card-text">You need to log in to create an account.</p>
              
              <button
                className="btn btn-primary btn-block mb-2"
                onClick={() => loginWithRedirect({ screen_hint: "signup" })}
              >
                Sign Up with Auth0
              </button>
              
              <button
                className="btn btn-secondary btn-block"
                onClick={() => loginWithRedirect()}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
