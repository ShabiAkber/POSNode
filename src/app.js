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
const paymentTypesRoutes = require("./routes/paymentTypesRoutes");
const paymentStatusesRoutes = require("./routes/paymentStatusesRoutes");
const orderTypesRoutes = require("./routes/orderTypesRoutes");
const orderStatusesRoutes = require("./routes/orderStatusesRoutes");
const orderRoutes = require("./routes/orderRoutes");
const orderDetailRoutes = require("./routes/orderDetailRoutes");
const voucherCardRoutes = require("./routes/voucherCardDetailRoutes");
const giftCardRoutes = require("./routes/giftCardDetailRoutes");
const menuVersionRoutes = require("./routes/menuVersionRoutes");
const menuGroupRoutes = require("./routes/menuGroupRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const genModifireRoutes = require("./routes/genModifireRoutes");
const genAddonRoutes = require("./routes/genAddonRoutes");
const kitchenSectionRoutes = require("./routes/kitchenSectionRoutes");
const kitWiseCatRoutes = require("./routes/kitWiseCatRoutes");
const inventoriesRoutes = require("./routes/inventoriesRoutes");
const cashRegisterRoutes = require("./routes/cashRegisterRoutes");
const cashTransactionRoutes = require("./routes/cashTransactionRoutes");
const tableDineInRoutes = require("./routes/tableDineInRoutes");
const orderDealRoutes = require("./routes/orderDealRoutes");

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
app.use("/api/payment-types", authMiddleware, paymentTypesRoutes);
app.use("/api/payment-statuses", authMiddleware, paymentStatusesRoutes);
app.use("/api/order-types", authMiddleware, orderTypesRoutes);
app.use("/api/order-statuses", authMiddleware, orderStatusesRoutes);
app.use("/api/orders", authMiddleware, orderRoutes);
app.use("/api/order-details", authMiddleware, orderDetailRoutes);
app.use("/api/voucher-cards", authMiddleware, voucherCardRoutes);
app.use("/api/gift-cards", authMiddleware, giftCardRoutes);
app.use("/api/menuVersions", authMiddleware, menuVersionRoutes);
app.use("/api/menuGroups", authMiddleware, menuGroupRoutes);
app.use("/api/categories", authMiddleware, categoryRoutes);
app.use("/api/genmodifires", authMiddleware, genModifireRoutes);
app.use("/api/genaddons", authMiddleware, genAddonRoutes);
app.use("/api/kitchensections", authMiddleware, kitchenSectionRoutes);
app.use("/api/kitwisecats", authMiddleware, kitWiseCatRoutes);
app.use("/api/inventories", authMiddleware, inventoriesRoutes);
app.use("/api/cash-registers", authMiddleware, cashRegisterRoutes);
app.use("/api/cash-transactions", authMiddleware, cashTransactionRoutes);
app.use("/api/tabledineins", authMiddleware, tableDineInRoutes);
app.use("/api/orderdeals", authMiddleware, orderDealRoutes);

// 🔥 Error Handling Middleware (must be last)
app.use(errorMiddleware);

// ✅ Export app for use in `server.js`
module.exports = app;
