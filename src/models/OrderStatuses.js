const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Branch = require("./Branches");

const OrderStatus = sequelize.define("OrderStatuses", {
  OrdS_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  OrdS_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  OrdS_Desc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  OrdS_BranchFK: {
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
  tableName: "OrderStatuses",
  timestamps: false,
});

module.exports = OrderStatus;
