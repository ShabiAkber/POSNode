const IRepository = require("./IRepository");
const { UserDetail, Branch } = require("../models"); // Import from models index
const PKGenerator = require("../utils/pkGenerator");

class UserRepository extends IRepository {
  constructor() {
    super(UserDetail);
  }

  async getAll(query) {
    try {
      const whereClause = { IsDeleted: false };
      if (query?.BranchId) {
        whereClause.Usr_BranchFK = query.BranchId;
      }

      const users = await UserDetail.findAll({
        where: whereClause,
        include: [{
          model: Branch,
          as: "Branches",
          attributes: ["Branch_PK", "Branch_Name"]
        }]
      });

      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  async getById(id) {
    return await UserDetail.findOne({
      where: { 
        Usr_PK: id,
        IsDeleted: false 
      },
      include: [{
        model: Branch,
        as: "Branches",
        attributes: ["Branch_PK", "Branch_Name"]
      }]
    });
  }

  async findByEmail(email) {
    return await UserDetail.findOne({
      where: { 
        Usr_Email: email, 
        IsDeleted: false 
      },
      include: [{
        model: Branch,
        as: "Branches",
        attributes: ["Branch_PK", "Branch_Name"]
      }]
    });
  }

  async create(data) {
    try {
      // Generate PK before creating record
      const pk = await PKGenerator.generatePK('UserDetails', 'Usr_PK');
      return await UserDetail.create({
        ...data,
        Usr_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    return await UserDetail.update(data, { 
      where: { Usr_PK: id }
    });
  }

  async delete(id) {
    return await UserDetail.update(
      { IsDeleted: true }, 
      { where: { Usr_PK: id }}
    );
  }
}

module.exports = new UserRepository();
