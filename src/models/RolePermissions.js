const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
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

module.exports = RolePermission;
