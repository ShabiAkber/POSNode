const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Branch = require("./Branches");

const TableDineIn = sequelize.define("TableDineIns", {
  Table_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Table_Number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  Table_Capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Table_IsOccupied: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  Table_BranchFK: {
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
  tableName: "TableDineIns",
  timestamps: false,
});

module.exports = TableDineIn;
