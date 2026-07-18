const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const crypto = require("crypto"); // for generating random tokens
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Register a new user
const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide a username, email, and password" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString("hex"); // generate a random toeken for email verification

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken: verificationToken, // save to user document for later verification
      verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
    });

    await newUser.save();

    // Send verification email
    const msg = {
      to: email,
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: "Verify your email",
      html: `<p>Click here to verify your email: <a href="${process.env.BASE_URL}/verify/${verificationToken}">Verify</a></p>`,
    };
    try {
      await sgMail.send(msg);
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

    res.status(201).json({
      success: true,
      message:
        "User registered successfully, Please verify your email before logging in.",
      userId: newUser._id,
      error: "",
    });
  } catch (error) {
    next(error); // passes to centralized handler
  }
};

// Log in a user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Block unverified useres
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        error: "Please verify your email before logging in.",
        code: "EMAIL_NOT_VERIFIED",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }, // 24h
    );

    res.json({
      success: true,
      accessToken: token,
      userId: user._id,
      username: user.username,
      error: "",
    });
  } catch (error) {
    next(error);
  }
};

// Verify email
const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() }, // not expired
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid or expired verification token",
      });
    }
    // Mark user as verfied and remove the verification token
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();
    res.json({
      success: true,
      message: "Email verified successfully, You can now log in.",
    });
  } catch (error) {
    next(error);
  }
};

// Resend verification to email
const resendVerification = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.isVerified)
      return res.status(400).json({ error: "Email already verified" });

    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.verificationToken = verificationToken;
    user.verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    const msg = {
      to: email,
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: "Verify your email",
      html: `<p>Click here to verify your email: <a href="${process.env.BASE_URL}/verify/${verificationToken}">Verify</a></p>`,
    };
    try {
      await sgMail.send(msg);
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

    res.json({
      success: true,
      message: "Verification email resent. Please check your inbox.",
    });
  } catch (error) {
    next(error);
  }
};

// Send password reset email
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Please provide an email" });
    }
    const user = await User.findOne({ email });
    // Don't reveal if email exists or not — security
    if (!user) {
      return res.json({
        success: true,
        message: "If that email exists, a reset link has been sent.",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // Send reset email
    const msg = {
      to: email,
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset.</p>
        <p>Click <a href="${process.env.BASE_URL}/reset-password/${resetToken}">here</a> to reset your password.</p>
        <p>This link expires in 1 hour.</p>
        <p>If you didn't request this, ignore this email.</p>
      `,
    };

    try {
      await sgMail.send(msg);
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

    res.json({
      success: true,
      message: "If that email exists, a reset link has been sent.",
    });
  } catch (error) {
    next(error);
  }
};

// Change password from inside account - protected route
const changePassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword) {
      return res.status(400).json({ error: "Please provide a new password" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// Reset password
const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ error: "Please provide a new password" });
    }

    // Find user with valid unexpired reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // token not expired
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid or expired reset token",
      });
    }

    // Hash new password and clear reset token
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({
      success: true,
      message: "Password reset successfully. You can now log in.",
    });
  } catch (error) {
    next(error);
  }
};

// Show user profile
const getProfile = async (req, res, next) => {
  try {
    // req.user.id comes from authMiddleware
    const user = await User.findById(req.user.id).select(
      "-password -verificationToken -resetPasswordToken -resetPasswordExpires",
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerification,
  forgotPassword,
  changePassword,
  resetPassword,
  getProfile,
};
