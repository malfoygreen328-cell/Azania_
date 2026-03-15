import axios from "axios";

// Base URL for vendor API
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1/vendor";

// Get all vendor applications
export const getVendorApplications = async () => {
  return await axios.get(`${API_BASE}/applications`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}` // if using JWT
    }
  });
};

// Get unpaid vendors
export const getUnpaidVendors = async () => {
  return await axios.get(`${API_BASE}/unpaid`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`
    }
  });
};

// Approve vendor
export const approveVendor = async (vendorId) => {
  return await axios.put(`${API_BASE}/approve/${vendorId}`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`
    }
  });
};

// Decline vendor
export const declineVendor = async (vendorId) => {
  return await axios.put(`${API_BASE}/decline/${vendorId}`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`
    }
  });
};

// Send email
export const sendEmail = async (emailData) => {
  return await axios.post(`${API_BASE}/send-email`, emailData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      "Content-Type": "application/json"
    }
  });
};