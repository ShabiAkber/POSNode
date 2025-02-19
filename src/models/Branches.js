const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const Branch = sequelize.define("Branches", {
  Branch_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Branch_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Branch_Address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Branch_City: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Branch_State: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Branch_Country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  IsActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: "Branches",
  timestamps: false,
});

module.exports = Branch;
