const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Department = sequelize.define("Department", {
  Dept_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  Dept_Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Dept_BranchFK: {
    type: DataTypes.STRING,
    allowNull: false
  },
  IsDeleted: {  // Assuming `IsDelete` means a soft delete flag
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: "Department",
  timestamps: false,
});

module.exports = Department;
