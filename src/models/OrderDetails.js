const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const Order = require("./Orders");
const VoucherCardDetail = require("./VoucherCardDetails");
const GiftCardDetail = require("./GiftCardDetails");
const Branch = require("./Branches");

const OrderDetail = sequelize.define("OrderDetails", {
  OrdD_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  OrdD_OrdFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Order,
      key: "Ord_PK",
    },
  },
  OrdD_DiscountPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0.0,
  },
  OrdD_PerOrderTax: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0.0,
  },
  OrdD_NetCost: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0.0,
  },
  OrdD_GrossCost: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0.0,
  },
  Ord_VchCrdFK: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: VoucherCardDetail,
      key: "VchCrd_PK",
    },
  },
  OrdD_GiftCrdFK: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: GiftCardDetail,
      key: "GiftCrd_PK",
    },
  },
  OrdD_Tip: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0.0,
  },
  OrdD_BranchFK: {
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
  tableName: "OrderDetails",
  timestamps: false,
});

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderDetail:
 *       type: object
 *       properties:
 *         OrdD_PK:
 *           type: string
 *           description: Unique identifier for the order detail
 *         OrdD_OrderFK:
 *           type: string
 *           description: Reference to the order
 *         OrdD_Quantity:
 *           type: number
 *           description: Quantity of items
 *         OrdD_UnitPrice:
 *           type: number
 *           description: Price per unit
 *         OrdD_TotalAmount:
 *           type: number
 *           description: Total amount for this detail line
 *         IsDeleted:
 *           type: boolean
 *           description: Soft delete flag
 *       required:
 *         - OrdD_PK
 *         - OrdD_OrderFK
 *         - OrdD_Quantity
 *         - OrdD_UnitPrice
 *         - OrdD_TotalAmount
 */

module.exports = OrderDetail;
