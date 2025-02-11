const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const WageType = sequelize.define("WageType", {
  WageT_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  WageT_Name: {
    type: DataTypes.STRING,
    allowNull: false, // Required field
  },
  IsDeleted: { // Assuming IsDelete is a soft delete flag
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  tableName: "WageType",
  timestamps: false,
});

module.exports = WageType;
