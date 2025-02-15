const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Branch = require("./Branches");

const VoucherCardDetail = sequelize.define("VoucherCardDetails", {
  VchCrd_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  VchCrd_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  VchCrd_Desc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  VchCrd_Type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  VchCrd_FrmDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  VchCrd_ToDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  VchCrd_Amt: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0.0,
  },
  VchCrd_BranchFK: {
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
  tableName: "VoucherCardDetails",
  timestamps: false,
});

module.exports = VoucherCardDetail;
