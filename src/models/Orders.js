const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const PaymentStatuses = require("./PaymentStatuses");
const PaymentTypes = require("./PaymentTypes");
const OrderTypes = require("./OrderTypes");
const OrderStatuses = require("./OrderStatuses");
const Branch = require("./Branches");
const TableDineIn = require("./TableDineIns");

const Order = sequelize.define("Orders", {
  Ord_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Ord_PaySFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: PaymentStatuses,
      key: "PayS_PK",
    },
  },
  Ord_PayTFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: PaymentTypes,
      key: "PayT_PK",
    },
  },
  Ord_OrderNo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Ord_OrdTFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: OrderTypes,
      key: "OrdT_PK",
    },
  },
  Ord_OrdSFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: OrderStatuses,
      key: "OrdS_PK",
    },
  },
  Ord_Date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Ord_ReceiptNo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Ord_BranchFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Branch,
      key: "Branch_PK"
    }
  },
  Ord_TableFK: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: TableDineIn,
      key: "Table_PK"
    }
  },
  IsDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: "Orders",
  timestamps: false,
});

module.exports = Order;
