const express = require("express");
const authMiddleware = require("./middleware/authMiddleware");
const corsMiddleware = require("./middleware/corsMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

// ✅ Enable CORS
app.use(corsMiddleware);

// ✅ Auth Routes (No Middleware)
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// ✅ Protected Routes (Require Authentication)
const userRoutes = require("./routes/userRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const wageTypeRoutes = require("./routes/wageTypeRoutes");
const userTypeRoutes = require("./routes/userTypeRoutes");
const branchRoutes = require("./routes/branchRoutes");

// 🔒 Apply authMiddleware only to protected routes
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/departments", authMiddleware, departmentRoutes);
app.use("/api/wage-types", authMiddleware, wageTypeRoutes);
app.use("/api/user-types", authMiddleware, userTypeRoutes);
app.use("/api/branches", authMiddleware, branchRoutes);

// 🔥 Error Handling Middleware (must be last)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
