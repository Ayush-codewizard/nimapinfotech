import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);

    useEffect(() => {
        fetchProducts();
    }, [page]);

    const fetchProducts = async () => {
        const response = await axios.get(`http://localhost:5000/api/product?page=${page}&pageSize=${pageSize}`);
        setProducts(response.data);
    };

    const handleNextPage = () => setPage((prev) => prev + 1);
    const handlePrevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="container mx-auto mt-4">
            <div className="text-center mb-4">
                <Link to="/categories" className="text-blue-500 hover:underline mb-4 block">Add Category</Link>
                <Link to="/products" className="text-blue-500 hover:underline mt-4 block">Add Products</Link>
            </div>
            <div className="text-center mb-4">
                <h2 className="text-xl text-cen font-bold mb-4">Product List</h2>
            </div>
            <table className="table-auto w-full border border-collapse">
                <thead>
                    <tr className="bg-gray-200 text-left">
                        <th className="px-4 py-2">ProductId</th>
                        <th className="px-4 py-2">ProductName</th>
                        <th className="px-4 py-2">CategoryName</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.ProductId} className="border-b hover:bg-gray-100">
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">{product.ProductName}</td>
                            <td className="px-4 py-2">{product.CategoryName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                <button
                    className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                    onClick={handlePrevPage}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default ProductList;