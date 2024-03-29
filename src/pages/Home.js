import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: "iPhone 13",
        price: 54999.0,
        description: `Buy Apple iPhone 13 (256 GB) - White. A total powerhouse.`,
        image: "13.jpeg",
      },
      {
        id: 2,
        name: "iPhone 14",
        price: 67999.0,
        description:
          "Buy Apple iPhone 14 (256 GB) - Purple. As amazing as ever. ",
        image: "14.jpeg",
      },
      {
        id: 3,
        name: "iPhone 15",
        price: 77999.0,
        description:
          "Buy Apple iPhone 15 (256 GB) - Pink. Serious power. Serious value. ",
        image: "15.jpeg",
      },
    ];

    setProducts(mockProducts);
  }, []);

  return (
    <>
      <Hero />
      <div id="products">
        <div className="container px-4 py-2" id="custom-cards">
          <h2 className="pb-2 border-bottom">Featured products</h2>
        </div>
        <div className="product-list">
            <ProductCard key={products.id} product={products} />
        </div>
      </div>
    </>
  );
};

export default Home;
