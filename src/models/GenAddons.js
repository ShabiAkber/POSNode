const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Category = require("./Categories");
const Branch = require("./Branches");

const GenAddon = sequelize.define("GenAddons", {
  GenAddon_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  GenAddon_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  GenAddon_CatFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Category,
      key: "Cat_PK"
    }
  },
  GenAddon_Price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  GenAddon_BranchFK: {
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
  tableName: "GenAddons",
  timestamps: false,
});

module.exports = GenAddon;
