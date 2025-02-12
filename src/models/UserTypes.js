const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Branch = require("./Branch");

const UserTypes = sequelize.define("UserTypes", {
  UsrT_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  UserT_Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  UsrT_BranchFK: {
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
  }
}, {
  tableName: "UserTypes",
  timestamps: false, // Disabling createdAt & updatedAt fields
});

// Export model
module.exports = UserTypes;
