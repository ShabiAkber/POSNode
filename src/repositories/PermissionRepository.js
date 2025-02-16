const IRepository = require("./IRepository");
const Permission = require("../models/Permissions");

class PermissionRepository extends IRepository {
  async getAll() {
    return await Permission.findAll();
  }

  async getById(id) {
    return await Permission.findByPk(id);
  }

  async create(data) {
    return await Permission.create(data);
  }

  async update(id, data) {
    const permission = await Permission.findByPk(id);
    if (!permission) return null;
    return await permission.update(data);
  }

  async delete(id) {
    const permission = await Permission.findByPk(id);
    if (!permission) return null;
    return await permission.destroy();
  }
}

module.exports = new PermissionRepository();
