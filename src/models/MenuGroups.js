const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const MenuVersion = require("./MenuVersions");
const Branch = require("./Branches");

const MenuGroup = sequelize.define("MenuGroups", {
  MenuGrp_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  MenuGrp_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  MenuGrp_MenuVerFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: MenuVersion,
      key: "MenuVer_PK"
    }
  },
  MenuGrp_BranchFK: {
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
  tableName: "MenuGroups",
  timestamps: false,
});

module.exports = MenuGroup;
