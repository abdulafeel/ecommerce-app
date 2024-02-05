import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="container mt-5" style={{ minHeight: "100vh" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Login</h2>
              <button
                className="btn btn-primary btn-block"
                onClick={() => loginWithRedirect()}
              >
                Login with Auth0
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
