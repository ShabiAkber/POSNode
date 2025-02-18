const { sequelize, Sequelize } = require("../config/db"); 
const { DataTypes } = Sequelize;

const Branch = require("./Branches");
const WageType = require("./WageTypes");
const Department = require("./Departments");
const UserType = require("./UserTypes");

const UserDetail = sequelize.define("UserDetails", {
  Usr_PK: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
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
    references: {
      model: UserType,
      key: "UsrT_PK"
    }
  },
  Usr_DeptFK: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: Department,
      key: "Dept_PK"
    }
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
    allowNull: false,
    references: {
      model: WageType,
      key: "WageT_PK"
    }
  },
  Usr_WageAmt: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  Usr_BranchFK: {
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
  tableName: "UserDetails",
  timestamps: false,
});

/**
 * @swagger
 * components:
 *   schemas:
 *     UserDetail:
 *       type: object
 *       properties:
 *         Usr_PK:
 *           type: string
 *           description: Unique identifier for the user
 *         Usr_UserName:
 *           type: string
 *           description: Username for login
 *         Usr_FirstName:
 *           type: string
 *           description: User's first name
 *         Usr_LastName:
 *           type: string
 *           description: User's last name
 *         Usr_Email:
 *           type: string
 *           description: User's email address
 *         Usr_ContactNo:
 *           type: string
 *           description: User's contact number
 *         Usr_Address:
 *           type: string
 *           description: User's address
 *         Usr_City:
 *           type: string
 *           description: User's city
 *         Usr_States:
 *           type: string
 *           description: User's state
 *         Usr_Country:
 *           type: string
 *           description: User's country
 *         Usr_IsActive:
 *           type: boolean
 *           description: User's active status
 *         Usr_BranchFK:
 *           type: string
 *           description: Reference to branch
 *         Usr_UsrTFK:
 *           type: string
 *           description: Reference to user type
 *         Usr_DeptFK:
 *           type: string
 *           description: Reference to department
 *         Usr_WageTFK:
 *           type: string
 *           description: Reference to wage type
 *         Usr_WageAmt:
 *           type: number
 *           description: User's wage amount
 *       required:
 *         - Usr_PK
 *         - Usr_UserName
 *         - Usr_Email
 *         - Usr_BranchFK
 *     UserInput:
 *       type: object
 *       properties:
 *         Usr_UserName:
 *           type: string
 *           example: "john.doe"
 *         Usr_Password:
 *           type: string
 *           example: "password123"
 *         Usr_FirstName:
 *           type: string
 *           example: "John"
 *         Usr_LastName:
 *           type: string
 *           example: "Doe"
 *         Usr_Email:
 *           type: string
 *           example: "john.doe@example.com"
 *         Usr_BranchFK:
 *           type: string
 *           example: "BR001"
 *       required:
 *         - Usr_UserName
 *         - Usr_Password
 *         - Usr_Email
 *         - Usr_BranchFK
 */

module.exports = UserDetail;
