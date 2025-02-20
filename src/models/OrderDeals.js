const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const OrderDeal = sequelize.define("OrderDeals", {
  Deal_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Deal_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Deal_Desc: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Deal_Amt: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  Deal_ImagePath: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  IsDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: "OrderDeals",
  timestamps: false,
});

module.exports = OrderDeal;