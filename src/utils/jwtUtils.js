const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// 🔹 Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email }, // Payload
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

module.exports = { generateToken };
