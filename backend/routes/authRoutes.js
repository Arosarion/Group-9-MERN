const express = require("express");
const router = express.Router();
// const authMiddleware = require("../middleware/authMiddleware"); // uncomment when authMiddleware is ready

const { registerUser, loginUser } = require("../controllers/authController");

// Public auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes — uncomment once authMiddleware is ready
// router.get("/profile", authMiddleware, getProgress);

module.exports = router;
