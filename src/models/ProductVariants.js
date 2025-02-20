const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const Product = require("./Products");
const Branch = require("./Branches");

const ProductVariant = sequelize.define("ProductVariants", {
  PrdVar_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  PrdVar_Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  PrdVar_Price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  PrdVar_ProductFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Product,
      key: "Prd_PK"
    }
  },
  PrdVar_BranchFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Branch,
      key: "Branch_PK"
    }
  },
  PrdVar_IsDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: "ProductVariants",
  timestamps: false
});

module.exports = ProductVariant;
