import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Vendor Schema
const vendorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false, // must explicitly select password on queries
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    businessName: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
    },

    registrationNumber: {
      type: String,
      required: [true, "Registration number is required"],
      trim: true,
    },

    taxNumber: {
      type: String,
      required: false, // optional
      trim: true,
    },

    businessType: {
      type: String,
      required: [true, "Business type is required"],
      trim: true,
    },

    documents: {
      registrationCert: {
        type: String,
        required: [true, "Registration certificate is required"],
      },
      directorId: {
        type: String,
        required: [true, "Director ID copy is required"],
      },
      proofOfAddress: {
        type: String,
        required: [true, "Proof of address is required"],
      },
      bankLetter: {
        type: String,
        required: false,
      },
    },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },

    role: {
      type: String,
      enum: ["vendor_owner", "vendor_staff"],
      default: "vendor_owner",
    },

    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
    },

    subscriptionPlan: {
      type: String,
      enum: ["BASIC", "PREMIUM", "COMMISSION"],
      default: "BASIC",
    },

    subscriptionLimit: {
      type: Number,
      default: 50, // Basic plan default
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// 🔐 Hash password before save (async hook does NOT use next)
vendorSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// 📦 Auto-adjust subscriptionLimit (sync hook, no async needed)
vendorSchema.pre("save", function () {
  if (this.isModified("subscriptionPlan")) {
    switch (this.subscriptionPlan) {
      case "PREMIUM":
        this.subscriptionLimit = 2000;
        break;
      case "COMMISSION":
        this.subscriptionLimit = Number.MAX_SAFE_INTEGER;
        break;
      default:
        this.subscriptionLimit = 50;
    }
  }
});

// 🔎 Compare password method
vendorSchema.methods.comparePassword = async function (candidatePassword) {
  if (!candidatePassword) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// 🚫 Remove sensitive info when returning JSON
vendorSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;