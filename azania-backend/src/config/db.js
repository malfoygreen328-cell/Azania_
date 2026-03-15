import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("❌ MongoDB URI not set in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // fail fast if MongoDB unreachable
      socketTimeoutMS: 45000,         // close inactive sockets
      autoIndex: true                 // auto build indexes (dev friendly)
    });

    console.log("✅ MongoDB connected");

  } catch (err) {
    console.error("❌ MongoDB initial connection error:", err.message);

    // retry after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

// Connection event listeners
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB disconnected. Attempting reconnect...");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB error:", err.message);
});

export default connectDB;