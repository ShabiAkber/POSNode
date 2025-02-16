const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Branch = require("./Branches");

const KitchenSection = sequelize.define("KitchenSections", {
  KitSec_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  KitSec_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  KitSec_BranchFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Branch,
      key: "Branch_PK"
    }
  },
  IsDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: "KitchenSections",
  timestamps: false,
});

module.exports = KitchenSection;
