const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Database Configuration
const DB_NAME = process.env.DB_NAME || "POSDB";
const DB_USER = process.env.DB_USER || "sa";
const DB_PASSWORD = process.env.DB_PASSWORD || "Pak123";
const DB_HOST = process.env.DB_HOST || "localhost";

// Initialize Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: false, // Set to console.log to see SQL queries
});

// Test Database Connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.info("✅ Connected to SQL Server successfully!");
    return true;
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    return false;
  }
};

module.exports = { sequelize, Sequelize, connectDB };
