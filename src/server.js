const app = require("./app");
const { connectDB } = require("./config/db");
const adminSeeder = require('./seeders/adminSeeder');

const PORT = process.env.PORT || 5000;

// Start server
const startServer = async () => {
  try {
    // Connect to database
    const isConnected = await connectDB();
    if (!isConnected) {
      throw new Error('Database connection failed');
    }

    // Seed admin user
    const seedingResult = await adminSeeder.seedAdmin();
    if (!seedingResult) {
      console.warn('⚠️ Admin seeding was not successful');
    }

    // Start listening
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
      console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('❌ Server failed to start:', error);
    process.exit(1);
  }
};

// Start the server
startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('❌ Unhandled Rejection:', err);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('❌ Uncaught Exception:', err);
}); 