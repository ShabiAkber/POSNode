const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Branch = require("./Branch");

const Role = sequelize.define("Roles", {
  Role_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Role_Name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  R_BranchFK: {
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

module.exports = Role;
