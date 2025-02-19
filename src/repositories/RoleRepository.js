const IRepository = require("./IRepository");
const Role = require("../models/Roles");

class RoleRepository extends IRepository {
  constructor() {
    super(Role);
  }

  async getAll(query) {
    return await Role.findAll({ where: { R_BranchFK: query.BranchId, IsDeleted: false } });
  }

  async getById(id) {
    return await Role.findByPk(id);
  }

  async create(data) {
    return await Role.create(data);
  }

  async update(id, data) {
    const role = await Role.findByPk(id);
    if (!role) return null;
    return await role.update(data);
  }

  async delete(id) {
    const role = await Role.findByPk(id);
    if (!role) return null;
    return await role.update({ IsDeleted: true });
  }
}

module.exports = new RoleRepository();
