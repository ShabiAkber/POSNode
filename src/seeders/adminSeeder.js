const { UserDetail } = require('../models');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const roleSeeder = require('./roleSeeder');

class AdminSeeder {
  async seedAdmin() {
    try {
      console.log('🌱 Starting admin user seeding...');

      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      // Check if admin already exists
      const existingAdmin = await UserDetail.findOne({
        where: { 
          Usr_Email: 'admin@example.com',
          IsDeleted: false 
        }
      });

      let adminUser;
      if (!existingAdmin) {
        adminUser = await UserDetail.create({
          Usr_PK: '0000000001',
          Usr_UserName: 'admin',
          Usr_Password: hashedPassword,
          Usr_FirstName: 'Admin',
          Usr_LastName: 'User',
          Usr_Email: 'admin@example.com',
          Usr_ContactNo: '+1234567890',
          Usr_IsActive: true,
          Usr_CheckIn: new Date(),
          Usr_CheckOut: new Date(),
          Usr_WageAmt: 0,
          IsDeleted: false
        });
        console.log('✅ Admin user created successfully!');
      } else {
        adminUser = existingAdmin;
        console.log('ℹ️ Admin user already exists');
      }

      // Seed admin role and assign to admin user
      await roleSeeder.seedAdminRole();

      return true;
    } catch (error) {
      console.error('❌ Admin seeding failed:', error.message);
      return false;
    }
  }
}

module.exports = new AdminSeeder(); 