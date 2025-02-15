const IRepository = require("./IRepository");
const UserRole = require("../models/UserRoles");

class UserRoleRepository extends IRepository {
  async findAll() {
    return await UserRole.findAll();
  }

  async findById(id) {
    return await UserRole.findByPk(id);
  }

  async create(data) {
    return await UserRole.create(data);
  }

  async update(id, data) {
    const userRole = await this.findById(id);
    if (!userRole) return null;
    return await userRole.update(data);
  }

  async delete(id) {
    const userRole = await this.findById(id);
    if (!userRole) return null;
    return await userRole.destroy();
  }
}

module.exports = new UserRoleRepository();
