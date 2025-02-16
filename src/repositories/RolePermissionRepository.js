const IRepository = require("./IRepository");
const RolePermission = require("../models/RolePermissions");

class RolePermissionRepository extends IRepository {
  async getAll() {
    return await RolePermission.findAll();
  }

  async getById(id) {
    return await RolePermission.findByPk(id);
  }

  async create(data) {
    return await RolePermission.create(data);
  }

  async update(id, data) {
    const rolePermission = await RolePermission.findByPk(id);
    if (!rolePermission) return null;
    return await rolePermission.update(data);
  }

  async delete(id) {
    const rolePermission = await RolePermission.findByPk(id);
    if (!rolePermission) return null;
    return await rolePermission.destroy();
  }
}

module.exports = new RolePermissionRepository();
