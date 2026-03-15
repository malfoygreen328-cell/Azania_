import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const fetchProducts = async () => {
  const res = await API.get("/products");
  return res.data;
};

export const createProduct = async (product) => {
  const res = await API.post("/products", product);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await API.delete(`/products/${id}`);
  return res.data;
};