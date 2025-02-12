const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Import Sequelize connection

const UserDetails = sequelize.define("UserDetails", {
  Usr_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  Usr_UserName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Usr_Password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Usr_FirstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Usr_LastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Usr_Designation: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Usr_ImagePath: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Usr_Email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Usr_ContactNo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Usr_Address: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Usr_City: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Usr_States: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Usr_ZipCode: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Usr_Country: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Usr_UsrTFK: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Usr_DeptFK: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Usr_CheckIn: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Usr_CheckOut: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Usr_IsActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  Usr_WageTFK: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Usr_WageAmt: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  Usr_BranchFK: {
    type: DataTypes.STRING,
    allowNull: false
  },
  IsDeleted: {  // Assuming `IsDelete` means a soft delete flag
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: "UserDetails",
  timestamps: false, // Disable createdAt & updatedAt fields
});

module.exports = UserDetails;
