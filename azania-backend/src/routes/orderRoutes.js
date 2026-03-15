import express from "express";
import {
  createOrder,
  getCustomerOrders,
  getVendorOrders,
  getOrderDetails,
  updateOrderStatus,
} from "../controllers/orderController.js";

import { verifyToken, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================================
   CREATE ORDER
   Only customers can place orders
   POST /api/orders
========================================= */
router.post("/", verifyToken, requireRole("customer"), createOrder);

/* =========================================
   GET CUSTOMER ORDERS
   Customers can see their own orders
   GET /api/orders
========================================= */
router.get("/", verifyToken, requireRole("customer"), getCustomerOrders);

/* =========================================
   GET VENDOR ORDERS
   Vendor can see orders containing their products
   GET /api/orders/vendor
========================================= */
router.get("/vendor", verifyToken, requireRole("vendor_owner"), getVendorOrders);

/* =========================================
   GET ORDER DETAILS
   Customers, Vendor (own products), Admin
   GET /api/orders/:id
   - We'll allow access inside controller based on req.user.role
========================================= */
router.get("/:id", verifyToken, getOrderDetails);

/* =========================================
   UPDATE ORDER STATUS
   Vendor (own products) or Admin can update
   PATCH /api/orders/:id
========================================= */
router.patch("/:id", verifyToken, requireRole("vendor_owner", "admin"), updateOrderStatus);

export default router;