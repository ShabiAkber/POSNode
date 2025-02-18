const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const Branch = require("./Branches");

const WageType = sequelize.define("WageTypes", {
  WageT_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  WageT_Name: {
    type: DataTypes.STRING,
    allowNull: false, // Required field
  },
  WageT_BranchFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Branch,
      key: "Branch_PK"
    }
  },
  IsDeleted: { // Assuming IsDelete is a soft delete flag
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  tableName: "WageTypes",
  timestamps: false,
});

/**
 * @swagger
 * components:
 *   schemas:
 *     WageType:
 *       type: object
 *       properties:
 *         WageT_PK:
 *           type: string
 *           description: Unique identifier for the wage type
 *         WageT_Name:
 *           type: string
 *           description: Name of the wage type
 *       required:
 *         - WageT_PK
 *         - WageT_Name
 */

module.exports = WageType;
