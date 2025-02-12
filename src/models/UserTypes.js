const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserTypes = sequelize.define("UserTypes", {
  UsrT_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  UserT_Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  UsrT_BranchFK: {
    type: DataTypes.STRING,
    allowNull: false
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
