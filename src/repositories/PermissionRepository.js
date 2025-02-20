const IRepository = require("./IRepository");
const Permission = require("../models/Permissions");

class PermissionRepository extends IRepository {
  constructor() {
    super(Permission);
  }

  async getAll(query) {
    return await Permission.findAll({ where: { Perm_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branch"] });
  }

  async getById(id) {
    return await Permission.findByPk(id, { include: ["Branch"] });
  }

  async create(data) {
    return await Permission.create(data);
  }

  async update(id, data) {
    return await Permission.update(data, { where: { Perm_PK: id } });
  }

  async delete(id) {
    return await Permission.update({ IsDeleted: true }, { where: { Perm_PK: id } });
  }
}

module.exports = new PermissionRepository();
