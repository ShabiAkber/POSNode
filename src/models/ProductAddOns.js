const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const Product = require("./Products");
const Branch = require("./Branches");
const GenAddon = require("./GenAddons");

const ProductAddOn = sequelize.define("ProductAddOn", {
  PrdAdd_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  PrdAdd_GenAddonFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: GenAddon,
      key: "GenAddon_PK"
    }
  },
  PrdAdd_ProductFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Product,
      key: "Prd_PK"
    }
  },
  PrdAdd_BranchFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Branch,
      key: "Branch_PK"
    }
  },
  PrdAdd_IsDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: "ProductAddOns",
  timestamps: false
});

module.exports = ProductAddOn;
