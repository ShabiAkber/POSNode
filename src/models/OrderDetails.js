const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = require("./Order");
const VoucherCardDetail = require("./VoucherCardDetails");
const GiftCardDetail = require("./GiftCardDetail");
const Branch = require("./Branch");

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
      key: "Vch_PK",
    },
  },
  OrdD_GiftCrdFK: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: GiftCardDetail,
      key: "Gift_PK",
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
});

module.exports = OrderDetail;
