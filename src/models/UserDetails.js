const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Import Sequelize connection
const UserTypes = require("./UserTypes");
const Department = require("./Departments");
const WageType = require("./WageTypes");

const UserDetails = sequelize.define("UserDetails", {
    Usr_PK: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    Usr_UserName: {
        type: DataTypes.STRING,
    },
    Usr_Password: {
        type: DataTypes.STRING,
    },
    Usr_FirstName: {
        type: DataTypes.STRING,
    },
    Usr_LastName: {
        type: DataTypes.STRING,
    },
    Usr_Designation: {
        type: DataTypes.STRING,
    },
    Usr_ImagePath: {
        type: DataTypes.STRING,
    },
    Usr_Email: {
        type: DataTypes.STRING,
    },
    Usr_ContactNo: {
        type: DataTypes.STRING,
    },
    Usr_Address: {
        type: DataTypes.STRING,
    },
    Usr_City: {
        type: DataTypes.STRING,
    },
    Usr_States: {
        type: DataTypes.STRING,
    },
    Usr_ZipCode: {
        type: DataTypes.STRING,
    },
    Usr_Country: {
        type: DataTypes.STRING,
    },
    Usr_UsrTFK: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Usr_DeptFK: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Usr_CheckIn: {
        type: DataTypes.DATE,
    },
    Usr_CheckOut: {
        type: DataTypes.DATE,
    },
    Usr_IsActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    Usr_WageTFK: {
        type: DataTypes.STRING,
    },
    Usr_WageAmt: {
        type: DataTypes.FLOAT,
    },
}, {
    tableName: "UserDetails",
    timestamps: false, // Disable createdAt & updatedAt fields
});

module.exports = UserDetails;
