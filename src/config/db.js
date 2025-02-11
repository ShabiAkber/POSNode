const sequelize = require("../config/db");

const UserDetails = require("./UserDetails");
const UserTypes = require("./UserTypes");
const Department = require("./Department");
const WageType = require("./WageType");

// **Associations (Relationships)**
UserTypes.hasMany(UserDetails, { foreignKey: "Usr_UsrTFK", as: "Users" });
UserDetails.belongsTo(UserTypes, { foreignKey: "Usr_UsrTFK", as: "UserType" });

Department.hasMany(UserDetails, { foreignKey: "Usr_DeptFK", as: "Users" });
UserDetails.belongsTo(Department, { foreignKey: "Usr_DeptFK", as: "Department" });

WageType.hasMany(UserDetails, { foreignKey: "Usr_WageTFK", as: "Users" });
UserDetails.belongsTo(WageType, { foreignKey: "Usr_WageTFK", as: "WageType" });

// Sync models with the database
sequelize.sync({ alter: true })
    .then(() => console.log("Database & tables synced successfully"))
    .catch(err => console.error("Error syncing database:", err));

module.exports = { sequelize, UserDetails, UserTypes, Department, WageType };
