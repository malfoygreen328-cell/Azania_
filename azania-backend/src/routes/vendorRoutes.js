// vendorRoutes.js
import express from "express";
import {
  registerVendor,
  getVendorApplications,
  getUnpaidVendors,
} from "../controllers/vendorController.js";
import { verifyToken, requireRole } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js"; // multer middleware for file uploads

const router = express.Router();

/**
 * @route   POST /api/v1/vendor/register
 * @desc    Register a new vendor with supporting documents upload
 * @access  Public (no authentication required for applying)
 */
router.post(
  "/register",
  upload.fields([
    { name: "registrationCert", maxCount: 1 },
    { name: "directorId", maxCount: 1 },
    { name: "proofOfAddress", maxCount: 1 },
  ]),
  registerVendor
);

/**
 * @route   GET /api/v1/vendor/applications
 * @desc    Get all vendor applications (pending, approved, etc.)
 * @access  Private (admin only)
 */
router.get(
  "/applications",
  verifyToken,
  requireRole("admin"),
  getVendorApplications
);

/**
 * @route   GET /api/v1/vendor/unpaid
 * @desc    Get vendors with unpaid subscriptions
 * @access  Private (admin only)
 */
router.get(
  "/unpaid",
  verifyToken,
  requireRole("admin"),
  getUnpaidVendors
);

export default router;