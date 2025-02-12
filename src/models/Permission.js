const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Branch = require("./Branch");

const Permission = sequelize.define("Permissions", {
  Perm_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Perm_Name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Perm_BranchFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references:{
        model: Branch,
        key: "Branch_PK"
    }
  },
  IsDeleted: {  // Assuming `IsDelete` means a soft delete flag
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Permission;
