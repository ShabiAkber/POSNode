const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const OrderDeal = require("./OrderDeals");
const Product = require("./Products");

// Relationship Table for Deal and Product
const OrderDealProduct = sequelize.define("OrderDealProducts", {
    DealProduct_PK: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    DealProduct_DealFK: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: OrderDeal,
        key: "Deal_PK"
      }
    },
    DealProduct_ProductFK: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Product,
        key: "Prd_PK"
      }
    },
    DealProduct_Quantity: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    DealProduct_Price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  }, {
    tableName: "OrderDealProducts",
    timestamps: false,
  });

module.exports = OrderDealProduct;