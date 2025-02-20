const IRepository = require("./IRepository");
const Role = require("../models/Roles");

class RoleRepository extends IRepository {
  constructor() {
    super(Role);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await Role.findAll({ where: { R_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branch"] });
    }
    return await Role.findAll({ where: { IsDeleted: false }, include: ["Branch"] });
  }

  async getById(id) {
    return await Role.findByPk(id, { include: ["Branch"] });
  }

  async create(data) {
    return await Role.create(data);
  }

  async update(id, data) {
    return await Role.update(data, { where: { R_PK: id } });
  }

  async delete(id) {
    return await Role.update({ IsDeleted: true }, { where: { R_PK: id } });
  }
}

module.exports = new RoleRepository();
