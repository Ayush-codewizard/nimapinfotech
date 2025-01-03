import React, { useState, useEffect } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../services/api";
import { Link } from "react-router-dom";

function CategoryForm() {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categoryName.trim()) {
            alert("Category name is required!");
            return;
        }

        try {
            if (editId) {
                await updateCategory(editId, { CategoryName: categoryName });
            } else {
                await createCategory({ CategoryName: categoryName });
            }
            setCategoryName("");
            setEditId(null);
            fetchCategories();
        } catch (error) {
            console.error("Error saving category:", error);
        }
    };

    const handleEdit = (category) => {
        setCategoryName(category.CategoryName);
        setEditId(category.CategoryId);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await deleteCategory(id);
                fetchCategories();
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        }
    };

    return (
        <div className="container mx-auto max-w-md mt-4">
            <div className="text-center mb-4">
                <Link to="/products" className="text-blue-500 hover:underline">
                    Add Products
                </Link>
            </div>
            <h2 className="text-xl font-bold mb-4 text-center">Manage Categories</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter category name"
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 w-full"
                >
                    {editId ? "Update" : "Add"}
                </button>
            </form>
            <ul className="list-disc pl-4 mt-4">
                {categories.map((category) => (
                    <li key={category.CategoryId} className="flex justify-between items-center">
                        <span className="text-gray-700">{category.CategoryName}</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(category)}
                                className="px-2 py-1 text-blue-500 hover:underline"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(category.CategoryId)}
                                className="px-2 py-1 text-red-500 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryForm;
