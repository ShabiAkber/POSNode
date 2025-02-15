const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Branch = require("./Branch");

const OrderType = sequelize.define("OrderTypes", {
  OrdT_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  OrdT_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  OrdT_ImagePath: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  OrdT_BranchFK: {
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
});

module.exports = OrderTypes;
