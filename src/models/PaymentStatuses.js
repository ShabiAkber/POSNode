const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Branch = require("./Branches");

const PaymentStatuses = sequelize.define("PaymentStatuses", {
  PayS_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  PayS_Status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  PayS_BranchFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references:{
        model: Branch,
        key: "Branch_PK"
    }
  },
  IsDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = PaymentStatuses;
