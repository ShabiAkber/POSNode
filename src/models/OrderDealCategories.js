const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const OrderDeal = require("./OrderDeals");
const Category = require("./Categories");

// Relationship Table for Deal and Category
const OrderDealCategory = sequelize.define("OrderDealCategories", {
    DealCat_PK: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    DealCat_DealFK: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: OrderDeal,
        key: "Deal_PK"
      }
    },
    DealCat_CategoryFK: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Category,
        key: "Cat_PK"
      }
    },
  }, {
    tableName: "OrderDealCategories",
    timestamps: false,
  });

module.exports = OrderDealCategory;