import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getCategories = () => api.get("/category");
export const createCategory = (data) => api.post("/category", data);
export const updateCategory = (id, data) => api.put(`/category/${id}`, data);
export const deleteCategory = (id) => api.delete(`/category/${id}`);

export const getProducts = (page, pageSize) =>
  api.get(`/product?page=${page}&pageSize=${pageSize}`);
export const createProduct = (data) => api.post("/product", data);
export const updateProduct = (id, data) => api.put(`/product/${id}`, data);
export const deleteProduct = (id) => api.delete(`/product/${id}`);
