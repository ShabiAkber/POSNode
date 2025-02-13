const express = require("express");
const authMiddleware = require("./middlewares/authMiddleware");
const corsMiddleware = require("./middlewares/corsMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

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
const roleRoutes = require("./routes/roleRoutes");
const permissionRoutes = require("./routes/permissionRoutes");
const rolePermissionRoutes = require("./routes/rolePermissionRoutes");
const userRoleRoutes = require("./routes/userRoleRoutes");

// 🔒 Apply authMiddleware only to protected routes
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/departments", authMiddleware, departmentRoutes);
app.use("/api/wage-types", authMiddleware, wageTypeRoutes);
app.use("/api/user-types", authMiddleware, userTypeRoutes);
app.use("/api/branches", authMiddleware, branchRoutes);
app.use("/api/roles", authMiddleware, roleRoutes);
app.use("/api/permissions", authMiddleware, permissionRoutes);
app.use("/api/role-permissions", authMiddleware, rolePermissionRoutes);
app.use("/api/user-roles", authMiddleware, userRoleRoutes);

// 🔥 Error Handling Middleware (must be last)
app.use(errorMiddleware);

// ✅ Export app for use in `server.js`
module.exports = app;
