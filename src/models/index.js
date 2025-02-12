const sequelize = require("../config/db");

// Import models
const UserDetails = require("./UserDetails");
const UserTypes = require("./UserTypes");
const Department = require("./Department");
const WageType = require("./WageType");
const Branch = require("./Branch"); // Added Branch model

// **Associations (Relationships)**

// ✅ UserDetail Relationships
UserTypes.hasMany(UserDetails, { foreignKey: "Usr_UsrTFK", as: "Users" });
UserDetails.belongsTo(UserTypes, { foreignKey: "Usr_UsrTFK", as: "UserType" });

Department.hasMany(UserDetails, { foreignKey: "Usr_DeptFK", as: "Users" });
UserDetails.belongsTo(Department, { foreignKey: "Usr_DeptFK", as: "Department" });

WageType.hasMany(UserDetails, { foreignKey: "Usr_WageTFK", as: "Users" });
UserDetails.belongsTo(WageType, { foreignKey: "Usr_WageTFK", as: "WageType" });

// ✅ Branch Relationships
Branch.hasMany(UserDetails, { foreignKey: "Usr_BranchFK", as: "Users" });
UserDetails.belongsTo(Branch, { foreignKey: "Usr_BranchFK", as: "Branch" });

Branch.hasMany(Department, { foreignKey: "Dept_BranchFK", as: "Departments" });
Department.belongsTo(Branch, { foreignKey: "Dept_BranchFK", as: "Branch" });

Branch.hasMany(WageType, { foreignKey: "WageT_BranchFK", as: "WageTypes" });
WageType.belongsTo(Branch, { foreignKey: "WageT_BranchFK", as: "Branch" });

Branch.hasMany(UserTypes, { foreignKey: "UsrT_BranchFK", as: "UserTypes" });
UserTypes.belongsTo(Branch, { foreignKey: "UsrT_BranchFK", as: "Branch" });

// **Sync models with the database**
sequelize.sync({ alter: true })
  .then(() => console.log("✅ Database & tables synced successfully"))
  .catch((err) => console.error("❌ Error syncing database:", err));

module.exports = { sequelize, UserDetails, UserTypes, Department, WageType, Branch };
