const sql = require('mssql');

const config = {
  server: 'MACPK-WKS-0258',
  user: 'sa',
  password: 'Pak123',
  options: {
    trustServerCertificate: true,
    instanceName: 'MSSQLSERVER02',
    encrypt: true,
    connectTimeout: 30000, // Increased timeout
    requestTimeout: 30000
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

async function createDatabase() {
  let pool;
  try {
    // Create a connection pool
    pool = await new sql.ConnectionPool(config).connect();
    console.log('✅ Connected to SQL Server');
    
    // Create database if it doesn't exist
    await pool.request().query(`
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
    
    console.log('✅ Database created or already exists');
    
    // Switch to the new database
    await pool.request().query('USE POSDB');
    console.log('✅ Switched to POSDB database');
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  } finally {
    if (pool) {
      await pool.close();
    }
  }
}

// Handle any uncaught errors
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

createDatabase(); 