const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const Branch = require("./Branches");

const Department = sequelize.define("Departments", {
  Dept_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Dept_Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Dept_BranchFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Branch,
      key: "Branch_PK"
    }
  },
  IsDeleted: {  // Assuming `IsDelete` means a soft delete flag
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: "Departments",
  timestamps: false,
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Department:
 *       type: object
 *       properties:
 *         Dept_PK:
 *           type: string
 *           description: Unique identifier for the department
 *         Dept_Name:
 *           type: string
 *           description: Name of the department
 *         Dept_Description:
 *           type: string
 *           description: Description of the department
 *         IsActive:
 *           type: boolean
 *           description: Department active status
 *       required:
 *         - Dept_PK
 *         - Dept_Name
 */

module.exports = Department;
