const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const Order = require("./Orders");
const Branch = require("./Branches");
const KitchenSection = require("./KitchenSections");

const KitchenOrder = sequelize.define("KitchenOrders", {
  KitOrd_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  KitOrd_OrderFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Order,
      key: "Ord_PK"
    }
  },
  KitOrd_KitchenSectionFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: KitchenSection,
      key: "KitSec_PK"
    }
  },  
  KitOrd_Status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  KitOrd_Date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  KitOrd_Time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  KitOrd_BranchFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Branch,
      key: "Branch_PK"
    }
  }
}, {
  tableName: "KitchenOrders",
  timestamps: false
});

module.exports = KitchenOrder;

