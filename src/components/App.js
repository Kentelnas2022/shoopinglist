import React, { useState } from "react";
import "../App.css";
import Header from "./Header";
import Cards from "./Cards";
import Footer from "./Footer";
import Greetings from "./Greetings";
import EditModal from "./EditModal"; // Import the modal component

function App() {
  const [groceries, setGroceries] = useState([
    { id: 1, name: "Bananas", price: 1.5, rating: 5, checked: false },
    { id: 2, name: "Apples", price: 2.0, rating: 4, checked: false },
    { id: 3, name: "Milk", price: 3.2, rating: 5, checked: false }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  const handleDelete = (id) => {
    const updatedGroceries = groceries.filter((item) => item.id !== id);
    setGroceries(updatedGroceries);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setShowModal(true); // Show the modal
  };

  const handleCheck = (id) => {
    const updatedGroceries = groceries.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setGroceries(updatedGroceries);
  };

  const updateItem = (updatedItem) => {
    const updatedGroceries = groceries.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setGroceries(updatedGroceries);
    setShowModal(false); // Close the modal
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update search term state
  };

  const filteredGroceries = groceries.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Filter based on search term

  const sortedGroceries = [...filteredGroceries].sort((a, b) => a.checked - b.checked);

  return (
    <div className="app-container">
      <Header />
      <Greetings user="Kent" />
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm} // Bind the value of the input to searchTerm state
          onChange={handleSearchChange} // Update search term on input change
        />
      </div>
      <div className="status">
        {sortedGroceries.filter((item) => item.checked).length} checked / {sortedGroceries.length} total
      </div>
      <div className="cards-container">
        {sortedGroceries.map((item) => (
          <Cards
            key={item.id}
            name={item.name}
            price={item.price}
            rating={item.rating}
            checked={item.checked}
            onDelete={() => handleDelete(item.id)}
            onEdit={() => handleEdit(item)} // Pass the current item to edit
            onCheck={() => handleCheck(item.id)}
          />
        ))}
      </div>
      <Footer />
      {showModal && (
        <EditModal
          item={currentItem}
          onUpdate={updateItem}
          onClose={() => setShowModal(false)} // Close modal function
        />
      )}
    </div>
  );
}

export default App;
