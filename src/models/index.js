const sequelize = require("../config/db");

// Import models
const UserDetail = require("./UserDetails");
const UserType = require("./UserTypes");
const Department = require("./Departments");
const WageType = require("./WageTypes");
const Branch = require("./Branch");
const Role = require("./Role");
const Permission = require("./Permission");
const RolePermission = require("./RolePermission");
const UserRole = require("./UserRole");

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

// **Role-Permission Relationship**
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: "RP_RoleFK", as: "Permissions" });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: "RP_PermissionFK", as: "Roles" });

// **User-Role Relationship**
UserDetail.belongsToMany(Role, { through: UserRole, foreignKey: "UR_UserFK", as: "Roles" });
Role.belongsToMany(UserDetail, { through: UserRole, foreignKey: "UR_RoleFK", as: "Users" });

// **Sync models with the database**
sequelize.sync({ alter: true })
  .then(() => console.log("✅ Database & tables synced successfully"))
  .catch((err) => console.error("❌ Error syncing database:", err));

module.exports = { sequelize, UserDetail, UserType, Department, WageType, Branch };
