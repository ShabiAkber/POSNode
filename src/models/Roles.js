const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const Branch = require("./Branches");

const Role = sequelize.define("Roles", {
  Role_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Role_Name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  R_BranchFK: {
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
  tableName: "Roles",
  timestamps: false,
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         Role_PK:
 *           type: string
 *           description: Unique identifier for the role
 *         Role_Name:
 *           type: string
 *           description: Name of the role
 *       required:
 *         - Role_PK
 *         - Role_Name
 */

module.exports = Role;
