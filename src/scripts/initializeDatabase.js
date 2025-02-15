const { initializeModels } = require('../models');

async function initializeDatabase() {
  try {
    console.log('Starting database initialization...');
    
    await initializeModels();
    
    console.log('✅ Database initialization completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    process.exit(1);
  }
}

// Handle any uncaught errors
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

initializeDatabase(); 