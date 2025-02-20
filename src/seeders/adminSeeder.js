const { UserDetail } = require('../models');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

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

      if (!existingAdmin) {
        const adminUser = {
          Usr_PK: uuidv4(),
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
        };

        await UserDetail.create(adminUser)
          .catch(error => {
            console.error('Failed to create admin user:', error);
            throw new Error('Admin user creation failed');
          });

        console.log('✅ Admin user created successfully!');
      } else {
        console.log('ℹ️ Admin user already exists');
      }

      return true;
    } catch (error) {
      console.error('❌ Admin seeding failed:', error.message);
      // Instead of throwing, return false to indicate failure
      return false;
    }
  }
}

module.exports = new AdminSeeder(); 