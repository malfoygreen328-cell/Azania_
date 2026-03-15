// vendorController.js
import Vendor from "../models/Vendor.js";

/**
 * Register a new vendor with documents
 */
export const registerVendor = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      businessName,
      registrationNumber,
      taxNumber,
      businessType,
      subscription,
    } = req.body;

    if (!fullName || !email || !password || !phone || !businessName || !registrationNumber || !businessType) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: "Email already registered." });
    }

    if (!req.files || !req.files.registrationCert || !req.files.directorId || !req.files.proofOfAddress) {
      return res.status(400).json({ message: "All required documents must be uploaded." });
    }

    const vendor = new Vendor({
      fullName,
      email,
      password,
      phone,
      businessName,
      registrationNumber,
      taxNumber,
      businessType,
      subscriptionPlan: subscription,
      documents: {
        registrationCert: req.files.registrationCert[0].path,
        directorId: req.files.directorId[0].path,
        proofOfAddress: req.files.proofOfAddress[0].path,
        bankLetter: "",
      },
    });

    await vendor.save();

    return res.status(201).json({
      message: "Vendor application submitted successfully. Waiting for admin approval.",
      vendorId: vendor._id,
    });
  } catch (error) {
    console.error("Vendor registration error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get all vendor applications
 */
export const getVendorApplications = async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: vendors });
  } catch (error) {
    console.error("Get vendor applications error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get unpaid vendors
 */
export const getUnpaidVendors = async (req, res) => {
  try {
    const unpaidVendors = await Vendor.find({ subscriptionPaid: false });
    return res.status(200).json({ success: true, data: unpaidVendors });
  } catch (error) {
    console.error("Get unpaid vendors error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};