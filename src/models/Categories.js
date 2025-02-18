const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const MenuGroup = require("./MenuGroups");
const Branch = require("./Branches");

const Category = sequelize.define("Categories", {
  Cat_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Cat_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Cat_ImagePath: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Cat_MenuGrpFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: MenuGroup,
      key: "MenuGrp_PK"
    }
  },
  Cat_BranchFK: {
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
  tableName: "Categories",
  timestamps: false,
});

module.exports = Category;
