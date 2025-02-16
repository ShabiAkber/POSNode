const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Category = require("./Categories");
const Branch = require("./Branches");

const Inventory = sequelize.define("Inventories", {
  Inv_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Inv_CatFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Category,
      key: "Cat_PK"
    }
  },
  Ivn_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Ivn_Type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Ivn_BulkOfQuantity: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  Ivn_BulkQuantityPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  Ivn_NoOfBulkItems: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  Ivn_PerUnitQuantity: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  Ivn_PerUnitPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  Ivn_MinStock: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  Ivn_CurrentStock: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  Ivn_BranchFK: {
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
  tableName: "Inventories",
  timestamps: false,
});

module.exports = Inventory;
