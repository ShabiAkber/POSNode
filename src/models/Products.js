const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const Branch = require("./Branches");
const Category = require("./Categories");
const Order = require("./Orders");

const Product = sequelize.define("Products", {
  Prd_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  Prd_Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Prd_Price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  Prd_Description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  Prd_Image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Prd_CategoryFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Category,
      key: "Cat_PK"
    }
  },
  Prd_Status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  Prd_Quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Prd_Unit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Prd_BranchFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Branch,
      key: "Branch_PK"
    }
  },
  Prd_OrderFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Order,
      key: "Ord_PK"
    }
  },
  IsDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: "Products",
  timestamps: false,
});

module.exports = Product;