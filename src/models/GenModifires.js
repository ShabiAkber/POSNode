const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Category = require("./Categories");
const Branch = require("./Branches");

const GenModifire = sequelize.define("GenModifires", {
  GenMod_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  GenMod_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  GenMod_CatFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Category,
      key: "Cat_PK"
    }
  },
  GenMod_Price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
  GenMod_BranchFK: {
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
  tableName: "GenModifires",
  timestamps: false,
});

module.exports = GenModifire;
