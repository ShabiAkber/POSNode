const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const Role = require("./Roles");
const Permission = require("./Permissions");
const Branch = require("./Branches");

const RolePermission = sequelize.define("RolePermissions", {
  RP_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  RP_RoleFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Role,
      key: "Role_PK",
    },
  },
  RP_PermissionFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Permission,
      key: "Perm_PK",
    },
  },
  RP_BranchFK: {
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
  tableName: "RolePermissions",
  timestamps: false,
});

/**
 * @swagger
 * components:
 *   schemas:
 *     RolePermission:
 *       type: object
 *       properties:
 *         RoleP_PK:
 *           type: string
 *           description: Unique identifier for the role-permission mapping
 *         RoleP_RoleFK:
 *           type: string
 *           description: Reference to role
 *         RoleP_PermFK:
 *           type: string
 *           description: Reference to permission
 *         IsDeleted:
 *           type: boolean
 *           description: Soft delete flag
 *       required:
 *         - RoleP_PK
 *         - RoleP_RoleFK
 *         - RoleP_PermFK
 */

module.exports = RolePermission;
