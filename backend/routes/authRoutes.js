const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  getProfile,
  changePassword,
} = require("../controllers/authController");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify/:token", verifyEmail);
router.post("/resend-verification", resendVerification);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Protected routes
router.get("/profile", authMiddleware, getProfile);
router.post("/change-password", authMiddleware, changePassword);

module.exports = router;
