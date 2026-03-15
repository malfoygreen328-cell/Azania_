import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Store from "../models/Store.js";

/* =========================================
   USER REGISTRATION
========================================= */
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.status = 400;
      throw error;
    }

    const user = await User.create({ name, email, password, role: "user" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    next(err);
  }
};

/* =========================================
   VENDOR REGISTRATION
========================================= */
export const registerVendor = async (req, res, next) => {
  try {
    const { name, email, password, storeName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("Vendor already exists");
      error.status = 400;
      throw error;
    }

    // Create vendor user
    const vendor = await User.create({ name, email, password, role: "vendor" });

    // Auto-create store for the vendor
    const store = await Store.create({
      vendor: vendor._id,
      owner: vendor._id,
      storeName: storeName || `${name}'s Store`,
    });

    const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      message: "Vendor registered successfully",
      vendor: {
        id: vendor._id,
        name: vendor.name,
        email: vendor.email,
        role: vendor.role,
      },
      store: {
        id: store._id,
        storeName: store.storeName,
        storeSlug: store.storeSlug,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

/* =========================================
   LOGIN
========================================= */
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid email or password");
      error.status = 400;
      throw error;
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.status = 400;
      throw error;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    let store = null;
    if (user.role === "vendor") {
      store = await Store.findOne({ vendor: user._id }).select("_id storeName storeSlug");
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
      store,
    });
  } catch (err) {
    next(err);
  }
};