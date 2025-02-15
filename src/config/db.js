const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Database Configuration
const DB_NAME = process.env.DB_NAME || "POSDB";
const DB_USER = process.env.DB_USER || "sa";
const DB_PASSWORD = process.env.DB_PASSWORD || "Pak123";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = parseInt(process.env.DB_PORT, 10) || 1433;
const DB_LOGGING = process.env.DB_LOGGING === "true"; // Enable logging via env variable

// Initialize Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mssql",
  port: DB_PORT,
  dialectOptions: {
    encrypt: true,
    trustServerCertificate: true, // Required for self-signed certs
  },
  pool: {
    max: 10, // Maximum number of connections
    min: 0, // Minimum number of connections
    acquire: 30000, // Max time (ms) to get a connection
    idle: 10000, // Max time (ms) before releasing an idle connection
  },
  logging: DB_LOGGING ? console.log : false, // Enable logging if DB_LOGGING=true
});

// Test Database Connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.info("✅ Connected to SQL Server successfully!");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

// Start Connection
connectDB();

module.exports = { sequelize, Sequelize };
