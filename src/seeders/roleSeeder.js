const { Role, RolePermission, UserRole, UserDetail } = require('../models');
const { v4: uuidv4 } = require('uuid');

class RoleSeeder {
  async seedAdminRole() {
    try {
      console.log('🌱 Starting admin role seeding...');

      // Create admin role if it doesn't exist
      const [adminRole] = await Role.findOrCreate({
        where: { Role_Name: 'Admin' },
        defaults: {
          Role_PK: '0000000001',
          Role_Name: 'Admin',
          IsDeleted: false
        }
      });

      // Find the admin user and assign role
      const adminUser = await UserDetail.findOne({
        where: { 
          Usr_Email: 'admin@example.com',
          IsDeleted: false 
        }
      });

      if (adminUser && adminRole) {
        // Check if role assignment already exists
        const [userRole] = await UserRole.findOrCreate({
          where: {
            UR_UserFK: adminUser.Usr_PK,
            UR_RoleFK: adminRole.Role_PK
          },
          defaults: {
            UR_PK: '0000000001',
            UR_UserFK: adminUser.Usr_PK,
            UR_RoleFK: adminRole.Role_PK,
            IsDeleted: false
          }
        });

        if (userRole) {
          console.log('✅ Admin role assigned to admin user successfully!');
        }
      }

      return true;
    } catch (error) {
      console.error('❌ Admin role seeding failed:', error.message);
      return false;
    }
  }
}

module.exports = new RoleSeeder(); 