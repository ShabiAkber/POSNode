const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwtUtils");
const UserRepository = require("../repositories/UserRepository"); // Assuming a repository exists

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 * 
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Usr_UserName:
 *                 type: string
 *                 example: "john.doe"
 *               Usr_Password:
 *                 type: string
 *                 example: "password123"
 *               Usr_FirstName:
 *                 type: string
 *                 example: "John"
 *               Usr_LastName:
 *                 type: string
 *                 example: "Doe"
 *               Usr_Email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               Usr_BranchFK:
 *                 type: string
 *                 example: "BR001"
 *               Usr_UsrTFK:
 *                 type: string
 *                 example: "UT001"
 *               Usr_DeptFK:
 *                 type: string
 *                 example: "DP001"
 *               Usr_WageTFK:
 *                 type: string
 *                 example: "WT001"
 *               Usr_WageAmt:
 *                 type: number
 *                 example: 15.50
 *             required:
 *               - Usr_UserName
 *               - Usr_Password
 *               - Usr_Email
 *               - Usr_BranchFK
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   $ref: '#/components/schemas/UserDetail'
 *       400:
 *         description: User already exists or invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User already exists"
 *       500:
 *         $ref: '#/components/schemas/Error'
 * 
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   $ref: '#/components/schemas/UserDetail'
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid email or password"
 *       500:
 *         $ref: '#/components/schemas/Error'
 */

const AuthController = {
  // ✅ Register User
  async register(req, res) {
    try {
      const { email, password } = req.body;
      
      // Check if user exists
      const existingUser = await UserRepository.findByEmail(email);
      if (existingUser) return res.status(400).json({ 
        success: false, 
        message: "User already exists" 
      });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user
      const user = await UserRepository.create({ 
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
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await UserRepository.findByEmail(email);
      if (!user) return res.status(400).json({ 
        success: false,
        message: "Invalid email or password" 
      });

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
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
