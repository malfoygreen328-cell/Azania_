const API_BASE = "http://localhost:5000/api/v1/vendor";

/**
 * Submit vendor registration with form data and files
 * @param {FormData} formData - FormData object containing fields and files
 * @returns {Promise<object>} - JSON response from server
 */
export const registerVendor = async (formData) => {
  try {
    const response = await fetch(`${API_BASE}/register`, {
      method: "POST",
      body: formData, // Must be FormData to handle files
    });

    return await response.json();
  } catch (error) {
    return { success: false, message: "Registration failed", error };
  }
};

/**
 * Fetch all vendor applications (admin only)
 * @param {string} token - Bearer JWT token for authorization
 * @returns {Promise<object>} - JSON response with vendor applications
 */
export const getVendorApplications = async (token) => {
  try {
    const response = await fetch(`${API_BASE}/applications`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    return { success: false, message: "Failed to fetch vendor applications", error };
  }
};

/**
 * Fetch vendors with unpaid subscriptions (admin only)
 * @param {string} token - Bearer JWT token for authorization
 * @returns {Promise<object>} - JSON response with unpaid vendors
 */
export const getUnpaidVendors = async (token) => {
  try {
    const response = await fetch(`${API_BASE}/unpaid`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    return { success: false, message: "Failed to fetch unpaid vendors", error };
  }
};