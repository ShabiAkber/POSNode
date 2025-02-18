const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const Branch = require("./Branches");

const PaymentStatus = sequelize.define("PaymentStatuses", {
  PayS_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  PayS_Status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  PayS_BranchFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references:{
        model: Branch,
        key: "Branch_PK"
    }
  },
  IsDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: "PaymentStatuses",
  timestamps: false,
});

/**
 * @swagger
 * components:
 *   schemas:
 *     PaymentStatus:
 *       type: object
 *       properties:
 *         PayS_PK:
 *           type: string
 *           description: Unique identifier for the payment status
 *         PayS_Name:
 *           type: string
 *           description: Name of the payment status
 *         IsDeleted:
 *           type: boolean
 *           description: Soft delete flag
 *       required:
 *         - PayS_PK
 *         - PayS_Name
 */

module.exports = PaymentStatus;
