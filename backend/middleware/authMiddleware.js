const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  //Get token from authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  // Token verification
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired toekn",
      });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
