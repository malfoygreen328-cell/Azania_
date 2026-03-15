import express from "express";
import cors from "cors";

// Import routes
import vendorAuthRoutes from "./routes/vendorAuthRoutes.js";
import customerAuthRoutes from "./routes/customerAuthRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";  // Ensure this is imported correctly

const app = express();

app.use(cors());
app.use(express.json());

// Auth routes
app.use("/api/vendors/auth", vendorAuthRoutes);
app.use("/api/customers/auth", customerAuthRoutes);

// Vendor routes (this should handle the /vendor/register route)
app.use("/api/v1/vendor", vendorRoutes);  // This should be correct!

// Root endpoint to check if the API is running
app.get("/", (req, res) => {
  res.send("Azania Backend API Running 🚀");
});

export default app;