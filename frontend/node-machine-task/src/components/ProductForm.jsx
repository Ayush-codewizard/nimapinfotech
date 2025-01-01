import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductForm() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productName, setProductName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    const fetchCategories = async () => {
        const response = await axios.get("http://localhost:5000/api/category");
        setCategories(response.data);
    };

    const fetchProducts = async () => {
        const response = await axios.get("http://localhost:5000/api/product");
        setProducts(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editId) {
            await axios.put(`http://localhost:5000/api/product/${editId}`, { ProductName: productName, CategoryId: categoryId });
        } else {
            await axios.post("http://localhost:5000/api/product", { ProductName: productName, CategoryId: categoryId });
        }
        setProductName("");
        setCategoryId("");
        setEditId(null);
        fetchProducts();
    };

    const handleEdit = (product) => {
        setProductName(product.ProductName);
        setCategoryId(product.CategoryId);
        setEditId(product.ProductId);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/product/${id}`);
        fetchProducts();
    };

    return (
        <div className="container mx-auto max-w-md mt-4">
            <div className="text-center mb-4">
                <Link to="/" className="text-blue-500 hover:underline mb-4">View Product Page</Link>
            </div>
            <h2 className="text-xl font-bold mb-4 text-center">Manage Products</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Enter product name"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.CategoryId} value={category.CategoryId}>
                            {category.CategoryName}
                        </option>
                    ))}
                </select>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 w-full">
                    {editId ? "Update" : "Add"}
                </button>
            </form>
            <ul className="list-disc pl-4 mt-4">
                {products.map((product) => (
                    <li key={product.ProductId} className="flex justify-between items-center">
                        <span className="text-gray-700">{product.ProductName} - {product.CategoryName}</span>
                        <div className="flex gap-2">
                            <button onClick={() => handleEdit(product)} className="px-2 py-1 text-blue-500 hover:underline">Edit</button>
                            <button onClick={() => handleDelete(product.ProductId)} className="px-2 py-1 text-red-500 hover:underline">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductForm;