const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const Branch = require("./Branches");

const OrderType = sequelize.define("OrderTypes", {
  OrdT_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  OrdT_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  OrdT_ImagePath: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  OrdT_BranchFK: {
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
  tableName: "OrderTypes",
  timestamps: false,
});

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderType:
 *       type: object
 *       properties:
 *         OrdT_PK:
 *           type: string
 *           description: Unique identifier for the order type
 *         OrdT_Name:
 *           type: string
 *           description: Name of the order type
 *         IsDeleted:
 *           type: boolean
 *           description: Soft delete flag
 *       required:
 *         - OrdT_PK
 *         - OrdT_Name
 */

module.exports = OrderType;
