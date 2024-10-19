import React, { useState } from "react";
import "./App.css";
import ProductModal from "./ProductModal";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const initialProducts = [
  { id: 1, name: "Banana", price: "₱30", img: "/img/Banana.jpg", category: "Fruits" },
  { id: 2, name: "Apple", price: "₱40", img: "/img/apple.jpg", category: "Fruits" },
  { id: 3, name: "Watermelon", price: "₱40", img: "/img/watermelon.jpg", category: "Fruits" },
  { id: 4, name: "Papaya", price: "₱40", img: "/img/papaya.jpg", category: "Fruits" },
  { id: 5, name: "Grapes", price: "₱40", img: "/img/grapes.jpg", category: "Fruits" },
  { id: 6, name: "Mango", price: "₱40", img: "/img/mango.jpg", category: "Fruits" },
  { id: 7, name: "Ampalaya", price: "₱40", img: "/img/ampalaya.jpg", category: "Vegetables" },
  { id: 8, name: "Broccoli", price: "₱40", img: "/img/broccoli.jpg", category: "Vegetables" },
  { id: 9, name: "Lettuce", price: "₱40", img: "/img/lettuce.jpg", category: "Vegetables" },
  { id: 10, name: "Carrot", price: "₱40", img: "/img/carrot.jpg", category: "Vegetables" },
  { id: 11, name: "Onion", price: "₱40", img: "/img/onion.jpg", category: "Vegetables" },
  { id: 12, name: "Eggplant", price: "₱40", img: "/img/eggplant.jpg", category: "Vegetables" },
  { id: 13, name: "Pancit Canton", price: "₱40", img: "/img/canton.jpg", category: "Processed foods" },
  { id: 14, name: "Century Tuna", price: "₱40", img: "/img/tuna.jpg", category: "Processed foods" },
  { id: 15, name: "Burger", price: "₱40", img: "/img/burger.jpg", category: "Processed foods" },
  { id: 16, name: "Coca-cola", price: "₱40", img: "/img/cocacola.jpg", category: "Processed foods" },
  { id: 17, name: "Hotdog", price: "₱40", img: "/img/hotdog.jpg", category: "Processed foods" },
  { id: 18, name: "Potatochips", price: "₱40", img: "/img/potatochips.jpg", category: "Processed foods" },
];

const categories = [...new Set(initialProducts.map(product => product.category))];

export default function MainContent({ searchQuery }) {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [checkedProducts, setCheckedProducts] = useState(new Set());

  // Open modal for editing
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  // Delete product
  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
    setCheckedProducts(prev => {
      const updated = new Set(prev);
      updated.delete(id);
      return updated;
    });
  };

  // Add new product modal
  const handleAddNewProduct = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  // Add or update product
  const handleAddProduct = (newProduct) => {
    const isExistingProduct = products.some((p) => p.id === newProduct.id);

    if (isExistingProduct) {
      setProducts(
        products.map((product) =>
          product.id === newProduct.id ? newProduct : product
        )
      );
    } else {
      setProducts([...products, newProduct]);
    }
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle checkbox
  const toggleCheck = (id) => {
    const updatedCheckedProducts = new Set(checkedProducts);
    if (updatedCheckedProducts.has(id)) {
      updatedCheckedProducts.delete(id); // Uncheck
    } else {
      updatedCheckedProducts.add(id); // Check
    }
    setCheckedProducts(updatedCheckedProducts);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  // Handle checkout for all products in a category
  const checkoutAll = (category) => {
    const categoryProducts = products.filter(product => product.category === category);
    const checkedIds = categoryProducts.map(product => product.id);
    const newCheckedProducts = new Set(checkedProducts);
    
    checkedIds.forEach(id => newCheckedProducts.add(id));
    setCheckedProducts(newCheckedProducts);

    alert(`Proceeding to checkout for all products in ${category}`);
  };

  // Get checked and remaining count for each category
  const getCheckedCount = (category) => {
    return products.filter(product => product.category === category && checkedProducts.has(product.id)).length;
  };

  const getRemainingCount = (category) => {
    return products.filter(product => product.category === category && !checkedProducts.has(product.id)).length;
  };

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
            </div>
          </div>
          <div className="category-content">
            <div className="product-grid">
              {filteredProducts
                .filter(product => product.category === category)
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
