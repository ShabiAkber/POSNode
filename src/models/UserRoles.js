const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const UserDetails = require("./UserDetails");
const Role = require("./Roles");
const Branch = require("./Branches");

const UserRole = sequelize.define("UserRoles", {
  UR_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  UR_UserFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: UserDetails,
      key: "Usr_PK",
    },
  },
  UR_RoleFK: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Role,
      key: "Role_PK",
    },
  },
  UR_BranchFK: {
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
  tableName: "UserRoles",
  timestamps: false,
});

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRole:
 *       type: object
 *       properties:
 *         UR_PK:
 *           type: string
 *           description: Unique identifier for the user-role mapping
 *         UR_UserFK:
 *           type: string
 *           description: Reference to user
 *         UR_RoleFK:
 *           type: string
 *           description: Reference to role
 *         IsDeleted:
 *           type: boolean
 *           description: Soft delete flag
 *       required:
 *         - UR_PK
 *         - UR_UserFK
 *         - UR_RoleFK
 */

module.exports = UserRole;
