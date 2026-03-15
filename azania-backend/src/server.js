// ---------------- IMPORTS ----------------
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";

// ---------------- ROUTES ----------------
import authRoutes from "./routes/authRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import publicProductRoutes from "./routes/publicProductRoutes.js";
import publicStoreRoutes from "./routes/publicStoreRoutes.js";
import storeRoutes from "./routes/storeRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import languageRoutes from "./routes/languageRoutes.js"; // NEW LANGUAGE API

// ---------------- ERROR HANDLER ----------------
import errorHandler from "./middleware/errorHandler.js";

// ---------------- LOAD ENV ----------------
dotenv.config();

// ---------------- CREATE APP ----------------
const app = express();

// ---------------- CONNECT DATABASE ----------------
connectDB().catch((err) => {
  console.error("❌ Database connection failed:", err.message);
  process.exit(1);
});

// ---------------- SECURITY MIDDLEWARE ----------------
app.use(helmet()); // Secure HTTP headers
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS attacks

// ---------------- CORS ----------------
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ---------------- BODY PARSER ----------------
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" })); // Parse URL-encoded bodies

// ---------------- PERFORMANCE ----------------
app.use(compression());

// ---------------- LOGGER ----------------
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ---------------- RATE LIMIT ----------------
const publicLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

// ---------------- API VERSION PREFIX ----------------
const API = "/api/v1";

// ---------------- PRIVATE ROUTES ----------------
app.use(`${API}/auth`, authRoutes);
app.use(`${API}/vendor`, vendorRoutes);
app.use(`${API}/products`, productRoutes);
app.use(`${API}/orders`, orderRoutes);
app.use(`${API}/stores`, storeRoutes);
app.use(`${API}/admin`, adminRoutes);
app.use(`${API}/payments`, paymentRoutes);

// ---------------- PUBLIC ROUTES ----------------
app.use(`${API}/public/products`, publicLimiter, publicProductRoutes);
app.use(`${API}/public/stores`, publicLimiter, publicStoreRoutes);
app.use(`${API}/public/language`, publicLimiter, languageRoutes);

// ---------------- HEALTH CHECK ----------------
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Azania Marketplace API is running 🚀",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date(),
  });
});

// ---------------- 404 HANDLER ----------------
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ---------------- GLOBAL ERROR HANDLER ----------------
app.use(errorHandler);

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;
let server;

const startServer = async () => {
  try {
    server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Frontend should call backend at http://localhost:${PORT}${API}`);
    });
  } catch (err) {
    console.error("❌ Server startup failed:", err.message);
    process.exit(1);
  }
};

startServer();

// ---------------- GRACEFUL SHUTDOWN ----------------
const shutdown = (signal) => {
  console.log(`⚠️ ${signal} received. Shutting down server...`);

  if (server) {
    server.close(() => {
      console.log("✅ Server closed gracefully");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));