const sql = require("mssql");
const dotenv = require("dotenv");

dotenv.config();

// Database configuration
const config = {
  user: process.env.DB_USER || "sa",
  password: process.env.DB_PASSWORD || "Pak123",
  server: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "POSDB",
  port: parseInt(process.env.DB_PORT, 10) || 1433,
  options: {
    encrypt: true, // Set to true if using SSL
    trustServerCertificate: true, // Required for self-signed certificates
  },
};

// Connect to the database
async function connectDB() {
  try {
    const pool = await sql.connect(config);
    console.log("✅ Connected to SQL Server using mssql!");
    return pool;
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
}

// Test the connection
connectDB();

module.exports = { connectDB, sql };
