import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // Customer reference
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    // Customer details (useful for guest checkout or quick access)
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    customerEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    // Products in the order
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },

        vendor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Vendor",
        },

        name: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        price: {
          type: Number,
          required: true,
        },
      },
    ],

    // Total order price
    totalAmount: {
      type: Number,
      required: true,
    },

    // Shipping info
    shippingAddress: {
      type: String,
      required: true,
      trim: true,
    },

    // Store reference
    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },

    // Order status
    status: {
      type: String,
      enum: [
        "pending",
        "paid",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },

    // Platform commission
    commissionAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

export default mongoose.model("Order", orderSchema);