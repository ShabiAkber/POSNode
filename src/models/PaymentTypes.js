const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const Branch = require("./Branches");

const PaymentType = sequelize.define("PaymentTypes", {
  PayT_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  PayT_Type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  PayT_BranchFK: {
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
  tableName: "PaymentTypes",
  timestamps: false,
});

/**
 * @swagger
 * components:
 *   schemas:
 *     PaymentType:
 *       type: object
 *       properties:
 *         PayT_PK:
 *           type: string
 *           description: Unique identifier for the payment type
 *         PayT_Name:
 *           type: string
 *           description: Name of the payment type
 *         IsDeleted:
 *           type: boolean
 *           description: Soft delete flag
 *       required:
 *         - PayT_PK
 *         - PayT_Name
 */

module.exports = PaymentType;
