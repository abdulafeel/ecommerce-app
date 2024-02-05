import React from "react";
import { useWishlist } from "../context/WishlistContext";

const WishlistCard = ({ item }) => (
  <div className="col" key={item.id}>
    <div className="card h-100">
      <img src={item.image} className="card-img-top" alt={item.name} />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">{item.description}</p>
        <p className="card-text">${item.price}</p>
        {/* Add more details like product description, price, etc. */}
      </div>
    </div>
  </div>
);

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="container mt-5" style={{ minHeight: "100vh" }}>
      <h2 className="mb-4">Wishlist</h2>
      {wishlist && wishlist.length !== 0 ? (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {wishlist.map((item) => (
            <WishlistCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="display-4">Your wishlist is empty</p>
          <p className="lead">
            Discover amazing products and add them to your wishlist!
          </p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
