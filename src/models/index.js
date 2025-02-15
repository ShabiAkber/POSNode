const { sequelize, connectDB } = require("../config/db");

// Import all models
const Branch = require("./Branches");
const UserType = require("./UserTypes");
const Department = require("./Departments");
const WageType = require("./WageTypes");
const UserDetail = require("./UserDetails");
const Role = require("./Roles");
const Permission = require("./Permissions");
const RolePermission = require("./RolePermissions");
const UserRole = require("./UserRoles");
const PaymentType = require("./PaymentTypes");
const PaymentStatus = require("./PaymentStatuses");
const OrderType = require("./OrderTypes");
const OrderStatus = require("./OrderStatuses");
const Order = require("./Orders");
const OrderDetail = require("./OrderDetails");
const VoucherCardDetail = require("./VoucherCardDetails");
const GiftCardDetail = require("./GiftCardDetails");

// **Associations (Relationships)**

// ✅ UserDetail Relationships
UserType.hasMany(UserDetail, { foreignKey: "Usr_UsrTFK", as: "UserDetails" });
UserDetail.belongsTo(UserType, { foreignKey: "Usr_UsrTFK", as: "UserTypes" });

Department.hasMany(UserDetail, { foreignKey: "Usr_DeptFK", as: "UserDetails" });
UserDetail.belongsTo(Department, { foreignKey: "Usr_DeptFK", as: "Departments" });

WageType.hasMany(UserDetail, { foreignKey: "Usr_WageTFK", as: "UserDetails" });
UserDetail.belongsTo(WageType, { foreignKey: "Usr_WageTFK", as: "WageTypes" });

// ✅ Branch Relationships
Branch.hasMany(UserDetail, { foreignKey: "Usr_BranchFK", as: "UserDetails" });
UserDetail.belongsTo(Branch, { foreignKey: "Usr_BranchFK", as: "Branches" });

Branch.hasMany(Department, { foreignKey: "Dept_BranchFK", as: "Departments" });
Department.belongsTo(Branch, { foreignKey: "Dept_BranchFK", as: "Branches" });

Branch.hasMany(WageType, { foreignKey: "WageT_BranchFK", as: "WageTypes" });
WageType.belongsTo(Branch, { foreignKey: "WageT_BranchFK", as: "Branches" });

Branch.hasMany(UserType, { foreignKey: "UsrT_BranchFK", as: "UserTypes" });
UserType.belongsTo(Branch, { foreignKey: "UsrT_BranchFK", as: "Branches" });

Branch.hasMany(Role, { foreignKey: "R_BranchFK", as: "Roles" });
Role.belongsTo(Branch, { foreignKey: "R_BranchFK", as: "Branches" });

Branch.hasMany(Permission, { foreignKey: "Perm_BranchFK", as: "Permissions" });
Permission.belongsTo(Branch, { foreignKey: "Perm_BranchFK", as: "Branches" });

Branch.hasMany(RolePermission, { foreignKey: "RP_BranchFK", as: "RolePermissions" });
RolePermission.belongsTo(Branch, { foreignKey: "RP_BranchFK", as: "Branches" });

Branch.hasMany(UserRole, { foreignKey: "UR_BranchFK", as: "UserRoles" });
UserRole.belongsTo(Branch, { foreignKey: "UR_BranchFK", as: "Branches" });

Branch.hasMany(PaymentType, { foreignKey: "PayT_BranchFK", as: "PaymentTypes" });
PaymentType.belongsTo(Branch, { foreignKey: "PayT_BranchFK", as: "Branches" });

Branch.hasMany(PaymentStatus, { foreignKey: "PayS_BranchFK", as: "PaymentStatuses" });
PaymentStatus.belongsTo(Branch, { foreignKey: "PayS_BranchFK", as: "Branches" });

Branch.hasMany(OrderType, { foreignKey: "OrdT_BranchFK", as: "OrderTypes" });
OrderType.belongsTo(Branch, { foreignKey: "OrdT_BranchFK", as: "Branches" });

Branch.hasMany(OrderStatus, { foreignKey: "OrdS_BranchFK", as: "OrderStatuses" });
OrderStatus.belongsTo(Branch, { foreignKey: "OrdS_BranchFK", as: "Branches" });

Branch.hasMany(Order, { foreignKey: "Ord_BranchFK", as: "Orders" });
Order.belongsTo(Branch, { foreignKey: "Ord_BranchFK", as: "Branches" });

Branch.hasMany(OrderDetail, { foreignKey: "OrdD_BranchFK", as: "OrderDetails" });
OrderDetail.belongsTo(Branch, { foreignKey: "OrdD_BranchFK", as: "Branches" });

Branch.hasMany(VoucherCardDetail, { foreignKey: "VchCrd_BranchFK", as: "VoucherCardDetails" });
VoucherCardDetail.belongsTo(Branch, { foreignKey: "VchCrd_BranchFK", as: "Branches" });

Branch.hasMany(GiftCardDetail, { foreignKey: "GiftCrd_BranchFK", as: "GiftCardDetails" });
GiftCardDetail.belongsTo(Branch, { foreignKey: "GiftCrd_BranchFK", as: "Branches" });

// **Role-Permission Relationship**
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: "RP_RoleFK", as: "Permissions" });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: "RP_PermissionFK", as: "Roles" });

// **User-Role Relationship**
UserDetail.belongsToMany(Role, { through: UserRole, foreignKey: "UR_UserFK", as: "Roles" });
Role.belongsToMany(UserDetail, { through: UserRole, foreignKey: "UR_RoleFK", as: "Users" });

// 🔗 **Define Relationships Order**
Order.belongsTo(PaymentStatus, { foreignKey: "Ord_PaySFK", as: "PaymentStatus" });
Order.belongsTo(PaymentType, { foreignKey: "Ord_PayTFK", as: "PaymentType" });
Order.belongsTo(OrderType, { foreignKey: "Ord_OrdTFK", as: "OrderType" });
Order.belongsTo(OrderStatus, { foreignKey: "Ord_OrdSFK", as: "OrderStatus" });

Order.hasMany(OrderDetail, { foreignKey: "OrdD_OrdFK", as: "OrderDetails" });

// 🔗 **Define Relationships Order Detail**
OrderDetail.belongsTo(Order, { foreignKey: "OrdD_OrdFK", as: "Orders" });
OrderDetail.belongsTo(VoucherCardDetail, { foreignKey: "Ord_VchCrdFK", as: "VoucherCardDetails" });
OrderDetail.belongsTo(GiftCardDetail, { foreignKey: "OrdD_GiftCrdFK", as: "GiftCardDetails" });

VoucherCardDetail.hasMany(OrderDetail, { foreignKey: "Ord_VchCrdFK", as: "OrderDetails" });
GiftCardDetail.hasMany(OrderDetail, { foreignKey: "OrdD_GiftCrdFK", as: "OrderDetails" });

// Function to initialize associations
function initializeAssociations() {
  // UserDetail Relationships
  UserType.hasMany(UserDetail, { foreignKey: "Usr_UsrTFK", as: "UserDetails" });
  UserDetail.belongsTo(UserType, { foreignKey: "Usr_UsrTFK", as: "UserTypes" });

  Department.hasMany(UserDetail, { foreignKey: "Usr_DeptFK", as: "UserDetails" });
  UserDetail.belongsTo(Department, { foreignKey: "Usr_DeptFK", as: "Departments" });

  WageType.hasMany(UserDetail, { foreignKey: "Usr_WageTFK", as: "UserDetails" });
  UserDetail.belongsTo(WageType, { foreignKey: "Usr_WageTFK", as: "WageTypes" });

  // Branch Relationships
  Branch.hasMany(UserDetail, { foreignKey: "Usr_BranchFK", as: "UserDetails" });
  UserDetail.belongsTo(Branch, { foreignKey: "Usr_BranchFK", as: "Branches" });

  // ... rest of your associations ...
}

// Initialize models and database
async function initializeModels() {
  try {
    // Test connection
    const isConnected = await connectDB();
    if (!isConnected) {
      throw new Error('Database connection failed');
    }

    // Initialize associations
    initializeAssociations();

    // Sync models (in development)
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log("✅ Database & tables synced successfully");
    }

  } catch (err) {
    console.error("❌ Database initialization failed:", err);
    throw err;
  }
}

// Export all models and initialization functions
module.exports = {
  sequelize,
  Branch,
  UserType,
  Department,
  WageType,
  UserDetail,
  Role,
  Permission,
  RolePermission,
  UserRole,
  PaymentType,
  PaymentStatus,
  OrderType,
  OrderStatus,
  Order,
  OrderDetail,
  VoucherCardDetail,
  GiftCardDetail,
  initializeModels,
  initializeAssociations
};
