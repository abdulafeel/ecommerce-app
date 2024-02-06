// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import MemberCheckout from "./pages/MemberCheckout";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Footer from "./components/Footer";
// import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Auth0Provider } from "@auth0/auth0-react";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Auth0Provider
      domain="dev-ilxzbc1fftyek4ls.us.auth0.com"
      clientId="Ue0jOOrIlDND0o0ufcyzzq0Togx7vgYa"
      redirectUri={window.location.origin}
      useLocalStorage={true} 
      cacheLocation="localstorage"    >
      {/* <AuthProvider> */}
        <CartProvider>
          <WishlistProvider>
            <Router>
              <div className="App">
                <Header />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                      path="/checkout-member"
                      element={<MemberCheckout />}
                    />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </WishlistProvider>
        </CartProvider>
      {/* </AuthProvider> */}
    </Auth0Provider>
  );
}

export default App;
