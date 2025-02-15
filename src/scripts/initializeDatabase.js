const { sequelize, connectDB } = require('../config/db');
const models = require('../models');

async function initializeDatabase() {
  try {
    // First test the connection
    const isConnected = await connectDB();
    
    if (!isConnected) {
      console.error('❌ Unable to connect to the database');
      process.exit(1);
    }

    // Initialize associations
    models.initializeAssociations();

    // Sync all models
    await sequelize.sync({ force: true }); // This will drop existing tables and recreate them
    console.log('✅ All models were synchronized successfully.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase(); 