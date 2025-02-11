const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const UserDetails = require("./UserDetails");

const Department = sequelize.define("Department", {
  Dept_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  Dept_Name: {
    type: DataTypes.STRING,
  },
  UpdatedBy: {
    type: DataTypes.STRING, // Assuming UpdateBy has an UpdatedBy field
  },
  UpdatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: "Department",
  timestamps: false,
});

module.exports = Department;
