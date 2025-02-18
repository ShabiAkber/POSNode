const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const Branch = require("./Branches");

const Permission = sequelize.define("Permissions", {
  Perm_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  Perm_Name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  Perm_BranchFK: {
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
  tableName: "Permissions",
  timestamps: false,
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Permission:
 *       type: object
 *       properties:
 *         Perm_PK:
 *           type: string
 *           description: Unique identifier for the permission
 *         Perm_Name:
 *           type: string
 *           description: Name of the permission
 *       required:
 *         - Perm_PK
 *         - Perm_Name
 */

module.exports = Permission;
