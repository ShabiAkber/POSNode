const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Branch = require("./Branch");

const WageType = sequelize.define("WageTypes", {
  WageT_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  WageT_Name: {
    type: DataTypes.STRING,
    allowNull: false, // Required field
  },
  WageT_BranchFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Branch,
      key: "Branch_PK"
    }
  },
  IsDeleted: { // Assuming IsDelete is a soft delete flag
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  tableName: "WageType",
  timestamps: false,
});

module.exports = WageType;
