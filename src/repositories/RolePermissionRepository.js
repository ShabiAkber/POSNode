const IRepository = require("./IRepository");
const RolePermission = require("../models/RolePermissions");

class RolePermissionRepository extends IRepository {
  constructor() {
    super(RolePermission);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await RolePermission.findAll({ where: { RP_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branch", "Role", "Permission"] });
    }
    return await RolePermission.findAll({ where: { IsDeleted: false }, include: ["Branch", "Role", "Permission"] });
  }

  async getById(id) {
    return await RolePermission.findByPk(id, { include: ["Branch", "Role", "Permission"] });
  }

  async create(data) {
    return await RolePermission.create(data);
  }

  async update(id, data) {
    return await RolePermission.update(data, { where: { RP_PK: id } });
  }

  async delete(id) {
    return await RolePermission.update({ IsDeleted: true }, { where: { RP_PK: id } });
  }
}

module.exports = new RolePermissionRepository();
