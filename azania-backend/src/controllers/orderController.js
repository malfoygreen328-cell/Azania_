import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

/* =========================================
   CREATE ORDER
   Customer can place an order
   POST /api/orders
========================================= */
export const createOrder = async (req, res, next) => {
  try {
    const { products, shippingAddress, paymentMethod } = req.body;

    if (!products || products.length === 0) {
      const error = new Error("No products provided for the order");
      error.status = 400;
      throw error;
    }

    // Calculate total price
    let totalPrice = 0;
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        const error = new Error(`Product not found: ${item.productId}`);
        error.status = 404;
        throw error;
      }

      totalPrice += product.price * item.quantity;
    }

    const order = await Order.create({
      customer: req.user._id,
      products,
      shippingAddress,
      paymentMethod,
      totalPrice,
      status: "PENDING",
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    next(err);
  }
};

/* =========================================
   GET CUSTOMER ORDERS
   GET /api/orders
========================================= */
export const getCustomerOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .populate("products.productId", "name price store")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (err) {
    next(err);
  }
};

/* =========================================
   GET VENDOR ORDERS
   Vendor can see orders containing their products
   GET /api/orders/vendor
========================================= */
export const getVendorOrders = async (req, res, next) => {
  try {
    // Find products belonging to this vendor
    const products = await Product.find({ vendor: req.user._id });
    const productIds = products.map((p) => p._id);

    // Find orders containing these products
    const orders = await Order.find({ "products.productId": { $in: productIds } })
      .populate("customer", "name email")
      .populate("products.productId", "name price")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (err) {
    next(err);
  }
};

/* =========================================
   UPDATE ORDER STATUS
   Admin or Vendor can update
   PATCH /api/orders/:id
========================================= */
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      const error = new Error("Order not found");
      error.status = 404;
      throw error;
    }

    // Optional: only vendor can update orders containing their products
    if (req.user.role === "vendor_owner") {
      const vendorProductIds = await Product.find({ vendor: req.user._id }).distinct("_id");
      const orderProductIds = order.products.map((p) => p.productId.toString());

      const intersects = orderProductIds.some((id) => vendorProductIds.includes(id));
      if (!intersects) {
        const error = new Error("Not authorized to update this order");
        error.status = 403;
        throw error;
      }
    }

    order.status = status || order.status;
    await order.save();

    res.json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (err) {
    next(err);
  }
};

/* =========================================
   GET ORDER DETAILS
   GET /api/orders/:id
========================================= */
export const getOrderDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("customer", "name email")
      .populate("products.productId", "name price store");

    if (!order) {
      const error = new Error("Order not found");
      error.status = 404;
      throw error;
    }

    // Ensure user is owner or vendor/admin
    if (
      req.user.role === "customer" &&
      order.customer._id.toString() !== req.user._id.toString()
    ) {
      const error = new Error("Not authorized to view this order");
      error.status = 403;
      throw error;
    }

    res.json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
};