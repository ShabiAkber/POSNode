const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Database Configuration
const DB_NAME = process.env.DB_NAME || "POSDB";
const DB_USER = process.env.DB_USER || "sa";
const DB_PASSWORD = process.env.DB_PASSWORD || "Pak123";
const DB_HOST = process.env.DB_HOST || "MACPK-WKS-0258";
const DB_INSTANCE = process.env.DB_INSTANCE || "MSSQLSERVER02";
const DB_PORT = parseInt(process.env.DB_PORT, 10) || 1433;
const DB_LOGGING = process.env.DB_LOGGING === "true";

// Initialize Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mssql",
  port: DB_PORT,
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true,
      instanceName: DB_INSTANCE
    },
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: DB_LOGGING ? console.log : false,
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
