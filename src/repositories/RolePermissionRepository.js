const IRepository = require("./IRepository");
const RolePermission = require("../models/RolePermissions");

class RolePermissionRepository extends IRepository {
  async findAll() {
    return await RolePermission.findAll();
  }

  async findById(id) {
    return await RolePermission.findByPk(id);
  }

  async create(data) {
    return await RolePermission.create(data);
  }

  async update(id, data) {
    const rolePermission = await this.findById(id);
    if (!rolePermission) return null;
    return await rolePermission.update(data);
  }

  async delete(id) {
    const rolePermission = await this.findById(id);
    if (!rolePermission) return null;
    return await rolePermission.destroy();
  }
}

module.exports = new RolePermissionRepository();
