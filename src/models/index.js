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
const MenuVersion = require("./MenuVersions");
const MenuGroup = require("./MenuGroups");
const Category = require("./Categories");
const GenModifire = require("./GenModifires");
const GenAddon = require("./GenAddons");
const KitchenSection = require("./KitchenSections");
const KitWiseCat = require("./KitWiseCats")


// Initialize models and database
async function initializeModels() {
  try {
    console.log("Connecting to DB...");
    const isConnected = await connectDB();

    if (!isConnected) {
      throw new Error('Database connection failed');
    }
    console.log("DB Connection successful!");

    // Define all associations
    console.log("Setting up model associations...");

    // UserDetail Relationships with NO ACTION
    UserType.hasMany(UserDetail, {
      foreignKey: "Usr_UsrTFK",
      as: "UserDetails",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    UserDetail.belongsTo(UserType, {
      foreignKey: "Usr_UsrTFK",
      as: "UserTypes"
    });

    Department.hasMany(UserDetail, {
      foreignKey: "Usr_DeptFK",
      as: "UserDetails",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    UserDetail.belongsTo(Department, {
      foreignKey: "Usr_DeptFK",
      as: "Departments"
    });

    WageType.hasMany(UserDetail, {
      foreignKey: "Usr_WageTFK",
      as: "UserDetails",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    UserDetail.belongsTo(WageType, {
      foreignKey: "Usr_WageTFK",
      as: "WageTypes"
    });

    // Branch Relationships with NO ACTION
    Branch.hasMany(UserDetail, {
      foreignKey: "Usr_BranchFK",
      as: "UserDetails",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    UserDetail.belongsTo(Branch, {
      foreignKey: "Usr_BranchFK",
      as: "Branches"
    });

    // Add NO ACTION to all Branch relationships
    Branch.hasMany(Department, {
      foreignKey: "Dept_BranchFK",
      as: "Departments",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    Department.belongsTo(Branch, {
      foreignKey: "Dept_BranchFK",
      as: "Branches"
    });

    Branch.hasMany(WageType, {
      foreignKey: "WageT_BranchFK",
      as: "WageTypes",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    WageType.belongsTo(Branch, {
      foreignKey: "WageT_BranchFK",
      as: "Branches"
    });

    Branch.hasMany(UserType, {
      foreignKey: "UsrT_BranchFK",
      as: "UserTypes",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    UserType.belongsTo(Branch, {
      foreignKey: "UsrT_BranchFK",
      as: "Branches"
    });

    Branch.hasMany(Role, {
      foreignKey: "R_BranchFK",
      as: "Roles",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    Role.belongsTo(Branch, {
      foreignKey: "R_BranchFK",
      as: "Branches"
    });

    Branch.hasMany(Permission, {
      foreignKey: "Perm_BranchFK",
      as: "Permissions",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    Permission.belongsTo(Branch, {
      foreignKey: "Perm_BranchFK",
      as: "Branches"
    });

    Branch.hasMany(RolePermission, {
      foreignKey: "RP_BranchFK",
      as: "RolePermissions",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    RolePermission.belongsTo(Branch, {
      foreignKey: "RP_BranchFK",
      as: "Branches"
    });

    Branch.hasMany(UserRole, {
      foreignKey: "UR_BranchFK",
      as: "UserRoles",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    UserRole.belongsTo(Branch, {
      foreignKey: "UR_BranchFK",
      as: "Branches"
    });

    Branch.hasMany(PaymentType, {
      foreignKey: "PayT_BranchFK",
      as: "PaymentTypes",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    PaymentType.belongsTo(Branch, {
      foreignKey: "PayT_BranchFK",
      as: "Branches"
    });

    Branch.hasMany(PaymentStatus, {
      foreignKey: "PayS_BranchFK",
      as: "PaymentStatuses",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    PaymentStatus.belongsTo(Branch, {
      foreignKey: "PayS_BranchFK",
      as: "Branches"
    });

    Branch.hasMany(OrderType, {
      foreignKey: "OrdT_BranchFK",
      as: "OrderTypes",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    OrderType.belongsTo(Branch, {
      foreignKey: "OrdT_BranchFK",
      as: "Branches"
    });

    Branch.hasMany(OrderStatus, {
      foreignKey: "OrdS_BranchFK",
      as: "OrderStatuses",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    OrderStatus.belongsTo(Branch, {
      foreignKey: "OrdS_BranchFK",
      as: "Branches"
    });

    Branch.hasMany(Order, {
      foreignKey: "Ord_BranchFK",
      as: "Orders",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    Order.belongsTo(Branch, {
      foreignKey: "Ord_BranchFK",
      as: "Branches"
    });

    Branch.hasMany(OrderDetail, {
      foreignKey: "OrdD_BranchFK",
      as: "OrderDetails",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    OrderDetail.belongsTo(Branch, {
      foreignKey: "OrdD_BranchFK",
      as: "Branches"
    });

    Branch.hasMany(VoucherCardDetail, {
      foreignKey: "VchCrd_BranchFK",
      as: "VoucherCardDetails",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    VoucherCardDetail.belongsTo(Branch, {
      foreignKey: "VchCrd_BranchFK",
      as: "Branches"
    });

    Branch.hasMany(GiftCardDetail, {
      foreignKey: "GiftCrd_BranchFK",
      as: "GiftCardDetails",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    GiftCardDetail.belongsTo(Branch, {
      foreignKey: "GiftCrd_BranchFK",
      as: "Branches"
    });

    Branch.hasMany(MenuVersion, {
      foreignKey: "MenuVer_BranchFK",
      as: "MenuVersions",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    MenuVersion.belongsTo(Branch, {
      foreignKey: "MenuVer_BranchFK",
      as: "Branches"
    });

    Branch.hasMany(MenuGroup, {
      foreignKey: "MenuGrp_BranchFK",
      as: "MenuGroups",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    MenuGroup.belongsTo(Branch, {
      foreignKey: "MenuGrp_BranchFK",
      as: "Branches"
    });

    Branch.hasMany(Category, {
      foreignKey: "Cat_BranchFK",
      as: "Categories",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    Category.belongsTo(Branch, {
      foreignKey: "Cat_BranchFK",
      as: "Branches"
    });

    Branch.hasMany(GenModifire, {
      foreignKey: "GenMod_BranchFK",
      as: "GenModifires",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    GenModifire.belongsTo(Branch, {
      foreignKey: "GenMod_BranchFK",
      as: "Branches"
    });

    Branch.hasMany(GenAddon, {
      foreignKey: "GenAddon_BranchFK",
      as: "GenAddons",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    GenAddon.belongsTo(Branch, {
      foreignKey: "GenAddon_BranchFK",
      as: "Branches"
    });

    Branch.hasMany(KitchenSection, {
      foreignKey: "KitSec_BranchFK",
      as: "KitchenSections",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    KitchenSection.belongsTo(Branch, {
      foreignKey: "KitSec_BranchFK",
      as: "Branches"
    });

    Branch.hasMany(KitWiseCat, {
      foreignKey: "KitSecCat_BranchFK",
      as: "KitWiseCats",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    KitWiseCat.belongsTo(Branch, {
      foreignKey: "KitSecCat_BranchFK",
      as: "Branches"
    });

    // Role-Permission Relationship with NO ACTION
    Role.belongsToMany(Permission, {
      through: RolePermission,
      foreignKey: "RP_RoleFK",
      as: "Permissions",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    Permission.belongsToMany(Role, {
      through: RolePermission,
      foreignKey: "RP_PermissionFK",
      as: "Roles",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });

    // User-Role Relationship
    UserDetail.belongsToMany(Role, {
      through: UserRole,
      foreignKey: "UR_UserFK",
      as: "Roles",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    Role.belongsToMany(UserDetail, {
      through: UserRole,
      foreignKey: "UR_RoleFK",
      as: "Users",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });

    // Define Relationships Order
    Order.belongsTo(PaymentStatus, {
      foreignKey: "Ord_PaySFK",
      as: "PaymentStatus",
    });
    Order.belongsTo(PaymentType, {
      foreignKey: "Ord_PayTFK",
      as: "PaymentType",
    });
    Order.belongsTo(OrderType, {
      foreignKey: "Ord_OrdTFK",
      as: "OrderType",
    });
    Order.belongsTo(OrderStatus, {
      foreignKey: "Ord_OrdSFK",
      as: "OrderStatus",
    });

    Order.hasMany(OrderDetail, {
      foreignKey: "OrdD_OrdFK",
      as: "OrderDetails",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });

    // Define Relationships Order Detail
    OrderDetail.belongsTo(Order, {
      foreignKey: "OrdD_OrdFK",
      as: "Orders",
    });
    OrderDetail.belongsTo(VoucherCardDetail, {
      foreignKey: "Ord_VchCrdFK",
      as: "VoucherCardDetails",
    });
    OrderDetail.belongsTo(GiftCardDetail, {
      foreignKey: "OrdD_GiftCrdFK",
      as: "GiftCardDetails",
    });

    VoucherCardDetail.hasMany(OrderDetail, {
      foreignKey: "Ord_VchCrdFK",
      as: "OrderDetails",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });
    GiftCardDetail.hasMany(OrderDetail, {
      foreignKey: "OrdD_GiftCrdFK",
      as: "OrderDetails",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });

    // Define Relationship of Menu Group
    MenuGroup.belongsTo(MenuVersion, {
      foreignKey: "MenuGrp_MenuVerFK",
      as: "MenuVersions",
    });
    MenuVersion.hasMany(MenuGroup, {
      foreignKey: "MenuGrp_MenuVerFK",
      as: "MenuGroups",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });

    // Define Relationship of Category
    Category.belongsTo(MenuGroup, {
      foreignKey: "Cat_MenuGrpFK",
      as: "MenuGroups",
    });
    MenuGroup.hasMany(Category, {
      foreignKey: "Cat_MenuGrpFK",
      as: "Categories",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });

    // Define Relationship Gen Modifire
    GenModifire.belongsTo(Category, {
      foreignKey: "GenMod_CatFK",
      as: "Categories",
    });
    Category.hasMany(GenModifire, {
      foreignKey: "GenMod_CatFK",
      as: "GenModifires",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });

    // Define Relationship Gen Addon
    GenAddon.belongsTo(Category, {
      foreignKey: "GenAddon_CatFK",
      as: "Categories",
    });
    Category.hasMany(GenAddon, {
      foreignKey: "GenAddon_CatFK",
      as: "GenAddons",
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION'
    });

    // Define Relationships KIt Section
    KitWiseCat.belongsTo(Category, { 
      foreignKey: "KitSecCat_CatFK", 
      as: "Categories",
    });
    KitWiseCat.belongsTo(KitchenSection, { 
      foreignKey: "KitSecCat_KitSecFK", 
      as: "KitchenSection",
    });

    console.log("Model associations set up successfully!");

    // Sync models with database
    console.log("Syncing models with database...");
    await sequelize.sync({ alter: true });
    console.log("✅ All models synchronized successfully!");

    return true;
  } catch (err) {
    console.error("❌ Database initialization failed:", err.message);
    if (err.original) {
      console.error("Original error:", err.original);
    }
    throw err;
  }
}

// Export everything
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
  MenuVersion,
  MenuGroup,
  Category,
  initializeModels
};
