const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const authMiddleware = require("./middlewares/authMiddleware");
const corsMiddleware = require("./middlewares/corsMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

// Swagger Documentation - must be before other routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    persistAuthorization: true
  },
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "POS API Documentation"
}));

// ✅ Enable CORS
app.use(corsMiddleware);

// Add this before your routes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

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
const productRoutes = require("./routes/productRoutes");
const productVariantRoutes = require("./routes/productVariantRoutes");
const productAddOnRoutes = require("./routes/productAddOnRoutes");
const kitchenOrderRoutes = require("./routes/kitchenOrderRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");

// 🔒 Apply authMiddleware only to protected routes
app.use("/api/user", authMiddleware, userRoutes);
app.use("/api/department", authMiddleware, departmentRoutes);
app.use("/api/wage-type", authMiddleware, wageTypeRoutes);
app.use("/api/user-type", authMiddleware, userTypeRoutes);
app.use("/api/branch", authMiddleware, branchRoutes);
app.use("/api/role", authMiddleware, roleRoutes);
app.use("/api/permission", authMiddleware, permissionRoutes);
app.use("/api/role-permission", authMiddleware, rolePermissionRoutes);
app.use("/api/user-role", authMiddleware, userRoleRoutes);
app.use("/api/payment-type", authMiddleware, paymentTypesRoutes);
app.use("/api/payment-status", authMiddleware, paymentStatusesRoutes);
app.use("/api/order-type", authMiddleware, orderTypesRoutes);
app.use("/api/order-status", authMiddleware, orderStatusesRoutes);
app.use("/api/order", authMiddleware, orderRoutes);
app.use("/api/order-detail", authMiddleware, orderDetailRoutes);
app.use("/api/voucher-card", authMiddleware, voucherCardRoutes);
app.use("/api/gift-card", authMiddleware, giftCardRoutes);
app.use("/api/menu-version", authMiddleware, menuVersionRoutes);
app.use("/api/menu-grp", authMiddleware, menuGroupRoutes);
app.use("/api/category", authMiddleware, categoryRoutes);
app.use("/api/general-modifier", authMiddleware, genModifireRoutes);
app.use("/api/general-addon", authMiddleware, genAddonRoutes);
app.use("/api/kitchen-section", authMiddleware, kitchenSectionRoutes);
app.use("/api/kitchen-category", authMiddleware, kitWiseCatRoutes);
app.use("/api/inventory", authMiddleware, inventoriesRoutes);
app.use("/api/cash-register", authMiddleware, cashRegisterRoutes);
app.use("/api/cash-transaction", authMiddleware, cashTransactionRoutes);
app.use("/api/tabledinein", authMiddleware, tableDineInRoutes);
app.use("/api/order-deal", authMiddleware, orderDealRoutes);
app.use("/api/product", authMiddleware, productRoutes);
app.use("/api/product-variant", authMiddleware, productVariantRoutes);
app.use("/api/product-addon", authMiddleware, productAddOnRoutes);
app.use("/api/kitchen-order", authMiddleware, kitchenOrderRoutes);
app.use("/api/restaurant", authMiddleware, restaurantRoutes);

// 🔥 Error Handling Middleware (must be last)
app.use(errorMiddleware);

// ✅ Export app for use in `server.js`
module.exports = app;
