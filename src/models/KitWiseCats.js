const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const Category = require("./Categories");
const KitchenSection = require("./KitchenSections");
const Branch = require("./Branches");

const KitWiseCat = sequelize.define("KitWiseCats", {
  KitSecCat_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  KitSecCat_CatFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Category,
      key: "Cat_PK"
    }
  },
  KitSecCat_KitSecFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: KitchenSection,
      key: "KitSec_PK"
    }
  },
  KitSecCat_BranchFK: {
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
  tableName: "KitWiseCats",
  timestamps: false,
});

module.exports = KitWiseCat;
