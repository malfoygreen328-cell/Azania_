// src/api/api.js
import axios from "axios";

// ---------------------- BASE URL ----------------------
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1";

// ---------------------- AXIOS INSTANCE ----------------------
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // set true only if backend uses cookies
});

// ---------------------- VENDORS ----------------------
export const getVendors = () => api.get("/vendor"); // all vendors
export const getVendorApplications = () => api.get("/vendor/applications"); // pending vendor applications
export const approveVendor = (id) => api.post(`/vendor/${id}/approve`);
export const declineVendor = (id) => api.post(`/vendor/${id}/decline`);
export const getUnpaidVendors = () => api.get("/vendor/unpaid");

// ---------------------- STATS ----------------------
export const getTrafficStats = () => api.get("/admin/stats/traffic");
export const getRevenueStats = () => api.get("/admin/stats/revenue");
export const getTopVendor = () => api.get("/admin/stats/top");

// ---------------------- EMAIL ----------------------
export const sendEmail = (data) => api.post("/admin/send-email", data);

// ---------------------- BRANDS ----------------------
export const getBrands = () => api.get("/stores");
export const addBrand = (data) => api.post("/stores", data);
export const updateBrand = (id, data) => api.put(`/stores/${id}`, data);
export const deleteBrand = (id) => api.delete(`/stores/${id}`);
export const deleteMultipleBrands = (ids) => api.post("/stores/delete-multiple", { ids });

// ---------------------- ACCESSORIES ----------------------
export const getAccessories = () => api.get("/products?category=accessories");
export const addAccessory = (data) =>
  api.post("/products", { ...data, category: "accessories" });
export const updateAccessory = (id, data) => api.put(`/products/${id}`, data);
export const deleteAccessory = (id) => api.delete(`/products/${id}`);
export const deleteMultipleAccessories = (ids) =>
  api.post("/products/delete-multiple", { ids });

// ---------------------- EXPORT AXIOS INSTANCE ----------------------
export default api;