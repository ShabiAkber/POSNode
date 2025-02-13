const IRepository = require("../interfaces/IRepository");
const Permission = require("../models/Permission");

class PermissionRepository extends IRepository {
  async findAll() {
    return await Permission.findAll();
  }

  async findById(id) {
    return await Permission.findByPk(id);
  }

  async create(data) {
    return await Permission.create(data);
  }

  async update(id, data) {
    const permission = await this.findById(id);
    if (!permission) return null;
    return await permission.update(data);
  }

  async delete(id) {
    const permission = await this.findById(id);
    if (!permission) return null;
    return await permission.destroy();
  }
}

module.exports = new PermissionRepository();
