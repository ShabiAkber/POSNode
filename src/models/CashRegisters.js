const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Branch = require("./Branches");

const CashRegister = sequelize.define("CashRegisters", {
  CashReg_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  CashReg_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CashReg_BranchFK: {
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
  tableName: "CashRegisters",
  timestamps: false,
});

module.exports = CashRegister;
