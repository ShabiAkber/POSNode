const IRepository = require("./IRepository");
const Permission = require("../models/Permissions");

class PermissionRepository extends IRepository {
  constructor() {
    super(Permission);
  }

  async getAll(query) {
    return await Permission.findAll({ where: { Perm_BranchFK: query.BranchId, IsDeleted: false } });
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
    return await permission.update({ IsDeleted: true });
  }
}

module.exports = new PermissionRepository();
