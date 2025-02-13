const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("POSDB", "sa", "Pak123", {
    dialect: "mssql",
    host: "MACPK-WKS-0258",
    port: 1433,
    dialectOptions: {
      options: {
        encrypt: false, // Set to true if using SSL
        trustServerCertificate: true,
      },
    },
    logging: console.log,
  });
  

async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection to the database has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
}

// Run the test function
testDatabaseConnection();
