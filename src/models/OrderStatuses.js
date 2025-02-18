const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const Branch = require("./Branches");

const OrderStatus = sequelize.define("OrderStatuses", {
  OrdS_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  OrdS_Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  OrdS_Desc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  OrdS_BranchFK: {
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
  tableName: "OrderStatuses",
  timestamps: false,
});

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderStatus:
 *       type: object
 *       properties:
 *         OrdS_PK:
 *           type: string
 *           description: Unique identifier for the order status
 *         OrdS_Name:
 *           type: string
 *           description: Name of the order status
 *         IsDeleted:
 *           type: boolean
 *           description: Soft delete flag
 *       required:
 *         - OrdS_PK
 *         - OrdS_Name
 */

module.exports = OrderStatus;
