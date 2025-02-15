const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Branch = require("./Branches");

const MenuVersion = sequelize.define("MenuVersions", {
  MenuVer_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  MenuVer_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  MenuVer_BranchFK: {
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
  tableName: "MenuVersions",
  timestamps: false,
});

module.exports = MenuVersion;
