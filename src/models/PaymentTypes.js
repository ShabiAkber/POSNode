const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Branch = require("./Branches");

const PaymentType = sequelize.define("PaymentTypes", {
  PayT_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  PayT_Type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  PayT_BranchFK: {
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
  tableName: "PaymentTypes",
  timestamps: false,
});

module.exports = PaymentType;
