import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryForm from "./components/CategoryForm";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Node.js Machine Test</h1>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/categories" element={<CategoryForm />} />
          <Route path="/products" element={<ProductForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
