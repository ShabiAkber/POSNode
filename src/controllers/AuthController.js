const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwtUtils");
const UserService = require("../services/UserService");

const AuthController = {
  // ✅ Register User
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      
      // Check if user exists
      const existingUser = await UserService.findByEmail(email);
      if (existingUser) return res.status(400).json({ 
        success: false, 
        message: "User already exists" 
      });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user
      const user = await UserService.create({ 
        ...req.body, 
        password: hashedPassword 
      });

      // Generate JWT Token
      const token = generateToken(user);

      res.status(201).json({ 
        success: true,
        message: "User registered successfully", 
        token,
        user
      });
    } catch (error) {
      next(error);
    }
  },

  // ✅ Login User
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await UserService.findByEmail(email);
      if (!user) return res.status(400).json({ 
        success: false,
        message: "Invalid email or password" 
      });

      // Compare password
      const isMatch = await bcrypt.compare(password, user.Usr_Password);
      if (!isMatch) return res.status(400).json({ 
        success: false,
        message: "Invalid email or password" 
      });

      // Generate JWT Token
      const token = generateToken(user);

      res.json({ 
        success: true,
        message: "Login successful", 
        token,
        user
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = AuthController;
