const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const Branch = require("./Branches");

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
    allowNull: true,
    references: {
      model: Branch,
      key: "Branch_PK"
    }
  },
  IsDeleted: {  // Assuming `IsDelete` means a soft delete flag
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: "Roles",
  timestamps: false,
});

module.exports = Role;
