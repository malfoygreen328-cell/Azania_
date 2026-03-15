// env.js - Load environment variables
const dotenv = require('dotenv');
dotenv.config();

// Example usage - Exporting variables
module.exports = {
  apiUrl: process.env.REACT_APP_API_URL, // Your back-end API base URL
  currency: 'ZAR', // South African Rand
  theme: 'bottleGreen', // Custom theme color
  vendorLimit: process.env.REACT_APP_VENDOR_LIMIT || 50, // Optional vendor plan limit
};