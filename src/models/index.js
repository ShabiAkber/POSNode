const sequelize = require("../config/db");
const UserDetail = require("./UserDetails");
const UserType = require("./UserTypes");
const Department = require("./Departments");
const WageType = require("./WageTypes");

// Sync models
sequelize.sync({ alter: true }) // Use { force: true } to drop & recreate tables
    .then(() => console.log("Database & tables synced"))
    .catch(err => console.error("Error syncing database:", err));

module.exports = {
    UserDetail,
    UserType,
    Department,
    WageType
};
