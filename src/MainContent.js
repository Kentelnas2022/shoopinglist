import React, { useState } from "react";
import "./App.css";
import ProductModal from "./ProductModal";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

// Initial list of products with their details
const initialProducts = [
  { id: 1, name: "Banana", price: "₱30", img: "/img/Banana.jpg", category: "Fruits" },
  { id: 2, name: "Apple", price: "₱40", img: "/img/apple.jpg", category: "Fruits" },
  { id: 3, name: "Watermelon", price: "₱40", img: "/img/watermelon.jpg", category: "Fruits" },
  { id: 4, name: "Mango", price: "₱40", img: "/img/mango.jpg", category: "Fruits" },
  { id: 5, name: "Ampalaya", price: "₱40", img: "/img/ampalaya.jpg", category: "Vegetables" },
  { id: 6, name: "Broccoli", price: "₱40", img: "/img/broccoli.jpg", category: "Vegetables" },
  { id: 7, name: "Lettuce", price: "₱40", img: "/img/lettuce.jpg", category: "Vegetables" },
  { id: 8, name: "Eggplant", price: "₱40", img: "/img/eggplant.jpg", category: "Vegetables" },
  { id: 9, name: "Pancit Canton", price: "₱40", img: "/img/canton.jpg", category: "Processed foods" },
  { id: 10, name: "Century Tuna", price: "₱40", img: "/img/tuna.jpg", category: "Processed foods" },
  { id: 11, name: "Burger", price: "₱40", img: "/img/burger.jpg", category: "Processed foods" },
  { id: 12, name: "Potatochips", price: "₱40", img: "/img/potatochips.jpg", category: "Processed foods" },
];

// Get all unique categories from the initial products list
const categories = [...new Set(initialProducts.map(product => product.category))];

export default function MainContent({ searchQuery }) {
  // State hooks for managing products, modal, and selections
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [checkedProducts, setCheckedProducts] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Opens the edit modal for a selected product
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  // Deletes a product by its id
  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
    setCheckedProducts(prev => {
      const updated = new Set(prev);
      updated.delete(id);
      return updated;
    });
  };

  // Opens the modal to add a product in a specific category
  const handleAddProductInCategory = (category) => {
    setSelectedProduct(null);
    setSelectedCategory(category);
    setModalOpen(true);
  };

  // Adds a new product or updates an existing one
  const handleAddProduct = (newProduct) => {
    const isExistingProduct = products.some((p) => p.id === newProduct.id);

    if (isExistingProduct) {
      setProducts(
        products.map((product) =>
          product.id === newProduct.id ? newProduct : product
        )
      );
    } else {
      setProducts([...products, { ...newProduct, id: products.length + 1, category: selectedCategory }]);
    }
    setSelectedCategory(null);
  };

  // Toggles the checked state of a product
  const toggleCheck = (id) => {
    const updatedCheckedProducts = new Set(checkedProducts);
    if (updatedCheckedProducts.has(id)) {
      updatedCheckedProducts.delete(id);
    } else {
      updatedCheckedProducts.add(id);
    }
    setCheckedProducts(updatedCheckedProducts);
  };

  // Closes the modal and resets selected states
  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
    setSelectedCategory(null);
  };

  // Gets the count of checked products in a category
  const getCheckedCount = (category) => {
    return products.filter(product => product.category === category && checkedProducts.has(product.id)).length;
  };

  // Gets the count of remaining (unchecked) products in a category
  const getRemainingCount = (category) => {
    return products.filter(product => product.category === category && !checkedProducts.has(product.id)).length;
  };

  // Checks if a category has no products after applying the search filter
  const isCategoryEmpty = (category) => {
    return filteredProducts.filter(product => product.category === category).length === 0;
  };

  // Filters products based on the search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="main-content">
      {categories.map(category => (
        <div key={category} className="category-container">
          <div className="category-header">
            <h2>{category}</h2>
            <div className="count-container">
              <button className="count-button">
                {`Checked: ${getCheckedCount(category)} | Remaining: ${getRemainingCount(category)}`}
              </button>
              <FaPlus className="add-product-icon" onClick={() => handleAddProductInCategory(category)} />
            </div>
          </div>
          <div className="category-content">
            {isCategoryEmpty(category) && <p>The product isn't existed</p>}
            <div className="product-grid">
              {filteredProducts
                .filter(product => product.category === category)
                .sort((a, b) => (checkedProducts.has(a.id) ? 1 : -1))
                .map(product => (
                  <div key={product.id} className={`product-box ${checkedProducts.has(product.id) ? 'crossed-out' : ''}`}>
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={checkedProducts.has(product.id)}
                        onChange={() => toggleCheck(product.id)}
                      />
                      <span className="checkmark"></span>
                    </label>
                    <img src={product.img} alt={product.name} className="product-image" />
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p>{product.price}</p>
                      <div className="product-icons">
                        <FaEdit className="icon edit-icon" onClick={() => handleEdit(product)} />
                        <FaTrashAlt className="icon delete-icon" onClick={() => handleDelete(product.id)} />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
      {isModalOpen && (
        <ProductModal product={selectedProduct} onClose={closeModal} onSave={handleAddProduct} />
      )}
    </main>
  );
}
