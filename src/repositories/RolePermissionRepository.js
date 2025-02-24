const IRepository = require("./IRepository");
const RolePermission = require("../models/RolePermissions");

class RolePermissionRepository extends IRepository {
  constructor() {
    super(RolePermission);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await RolePermission.findAll({ where: { RP_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches", "Roles", "Permissions"] });
    }
    return await RolePermission.findAll({ where: { IsDeleted: false }, include: ["Branches", "Roles", "Permissions"] });
  }

  async getById(id) {
    return await RolePermission.findByPk(id, { include: ["Branches", "Roles", "Permissions"] });
  }

  async create(data) {
    try{
      const pk = await PKGenerator.generatePK('RolePermissions', 'RP_PK');
      return await RolePermission.create({
        ...data,
        RP_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }
  
  async update(id, data) {
    return await RolePermission.update(data, { where: { RP_PK: id } });
  }

  async delete(id) {
    return await RolePermission.update({ IsDeleted: true }, { where: { RP_PK: id } });
  }
}

module.exports = new RolePermissionRepository();
