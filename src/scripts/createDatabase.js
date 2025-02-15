const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'Pak123',
  server: 'localhost',
  options: {
    trustServerCertificate: true,
    // enableArithAbort: true,
    encrypt: false,
    // Comment out instanceName if you're using default instance
    // instanceName: 'MSSQLSERVER02',
    connectTimeout: 30000,  // Increased timeout to 30 seconds
    requestTimeout: 30000
  }
};

async function createDatabase() {
  try {
    console.log('Attempting to connect with config:', {
      server: config.server + '\\' + config.options.instanceName,
      user: config.user,
      options: config.options
    });

    // Connect to SQL Server
    await sql.connect(config);
    console.log('✅ Connected to SQL Server');

    // Create database if it doesn't exist
    await sql.query(`
      IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'POSDB')
      BEGIN
        CREATE DATABASE POSDB;
        PRINT 'Database POSDB created successfully';
      END
      ELSE
      BEGIN
        PRINT 'Database POSDB already exists';
      END
    `);

    console.log('✅ Database operation completed');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error details:', {
      message: err.message,
      code: err.code,
      number: err.number
    });
    process.exit(1);
  }
}

// Handle any uncaught errors
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

createDatabase(); 