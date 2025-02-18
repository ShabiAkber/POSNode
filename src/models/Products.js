const { sequelize, Sequelize } = require("../config/db");
const { DataTypes } = Sequelize;

const Product = sequelize.define("Products", {});

module.exports = Product;