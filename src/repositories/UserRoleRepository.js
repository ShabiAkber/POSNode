const IRepository = require("./IRepository");
const UserRole = require("../models/UserRoles");

class UserRoleRepository extends IRepository {
  constructor() {
    super(UserRole);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await UserRole.findAll({ where: { UR_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches", "Users", "Roles"] });
    }
    return await UserRole.findAll({ where: { IsDeleted: false }, include: ["Branches", "Users", "Roles"] });
  }

  async getById(id) {
    return await UserRole.findByPk(id, { include: ["Branches", "Users", "Roles"] });
  }

  async create(data) {
    try{
      const pk = await PKGenerator.generatePK('UserRoles', 'UR_PK');
      return await UserRole.create({
        ...data,
        UR_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }
  
  async update(id, data) {
    return await UserRole.update(data, { where: { UR_PK: id } });
  }

  async delete(id) {
    return await UserRole.update({ IsDeleted: true }, { where: { UR_PK: id } });
  }
}

module.exports = new UserRoleRepository();
