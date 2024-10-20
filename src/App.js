import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import MainContent from "./MainContent";
import Greetings from "./Greetings";

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Header cartCount={cartCount} onSearch={handleSearch} />
      <Greetings user="Kent" />
      <MainContent onAddToCart={handleAddToCart} searchQuery={searchQuery} />
    </div>
  );
}
