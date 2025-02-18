const IRepository = require("./IRepository");
const UserRole = require("../models/UserRoles");

class UserRoleRepository extends IRepository {
  constructor() {
    super(UserRole);
  }

  async getAll() {
    return await UserRole.findAll();
  }

  async getById(id) {
    return await UserRole.findByPk(id);
  }

  async create(data) {
    return await UserRole.create(data);
  }

  async update(id, data) {
    const userRole = await UserRole.findByPk(id);
    if (!userRole) return null;
    return await userRole.update(data);
  }

  async delete(id) {
    const userRole = await UserRole.findByPk(id);
    if (!userRole) return null;
    return await userRole.update({ IsDeleted: true });
  }
}

module.exports = new UserRoleRepository();
