const IRepository = require("./IRepository");
const Role = require("../models/Roles");

class RoleRepository extends IRepository {
  async findAll() {
    return await Role.findAll();
  }

  async findById(id) {
    return await Role.findByPk(id);
  }

  async create(data) {
    return await Role.create(data);
  }

  async update(id, data) {
    const role = await this.findById(id);
    if (!role) return null;
    return await role.update(data);
  }

  async delete(id) {
    const role = await this.findById(id);
    if (!role) return null;
    return await role.destroy();
  }
}

module.exports = new RoleRepository();
