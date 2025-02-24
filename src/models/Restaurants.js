const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const Restaurant = sequelize.define("Restaurants", {
  Res_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Res_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  IsDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  tableName: "Restaurants",
  timestamps: false,
});

module.exports = Restaurant;