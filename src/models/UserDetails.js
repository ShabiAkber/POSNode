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

module.exports = UserDetail;
