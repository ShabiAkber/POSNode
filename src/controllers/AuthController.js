const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwtUtils");
const UserRepository = require("../repositories/UserRepository"); // Assuming a repository exists

const AuthController = {
  // ✅ Register User
  async register(req, res) {
    try {
      const { email, password } = req.body;
      
      // Check if user exists
      const existingUser = await UserRepository.findByEmail(email);
      if (existingUser) return res.status(400).json({ message: "User already exists" });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user
      const user = await UserRepository.create({ email, password: hashedPassword });

      // Generate JWT Token
      const token = generateToken(user);

      res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  },

  // ✅ Login User
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await UserRepository.findByEmail(email);
      if (!user) return res.status(400).json({ message: "Invalid email or password" });

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

      // Generate JWT Token
      const token = generateToken(user);

      res.json({ message: "Login successful", token });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  },
};

module.exports = AuthController;
