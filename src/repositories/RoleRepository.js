const IRepository = require("./IRepository");
const Role = require("../models/Roles");

class RoleRepository extends IRepository {
  constructor() {
    super(Role);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await Role.findAll({ where: { R_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches"] });
    }
    return await Role.findAll({ where: { IsDeleted: false }, include: ["Branches"] });
  }

  async getById(id) {
    return await Role.findByPk(id, { include: ["Branches"] });
  }

  async create(data) {
    try{
      const pk = await PKGenerator.generatePK('Roles', 'R_PK');
      return await Role.create({
        ...data,
        R_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    return await Role.update(data, { where: { R_PK: id } });
  }

  async delete(id) {
    return await Role.update({ IsDeleted: true }, { where: { R_PK: id } });
  }
}

module.exports = new RoleRepository();
