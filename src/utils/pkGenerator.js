const { sequelize } = require('../config/db');

class PKGenerator {
  static async generatePK(tableName, pkColumnName) {
    try {
      // Get the latest PK value from the table
      const result = await sequelize.query(
        `SELECT TOP 1 ${pkColumnName} 
         FROM ${tableName} 
         ORDER BY ${pkColumnName} DESC`,
        {
          type: sequelize.QueryTypes.SELECT
        }
      );

      let nextNumber;
      if (result && result.length > 0) {
        // Extract the numeric part and increment
        const lastPK = result[0][pkColumnName];
        nextNumber = parseInt(lastPK) + 1;
      } else {
        // If no records exist, start with 1
        nextNumber = 1;
      }

      // Pad with zeros to make it 10 digits
      return nextNumber.toString().padStart(10, '0');
    } catch (error) {
      console.error(`Error generating PK for ${tableName}:`, error);
      throw error;
    }
  }
}

module.exports = PKGenerator; 