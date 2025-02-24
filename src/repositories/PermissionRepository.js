const IRepository = require("./IRepository");
const Permission = require("../models/Permissions");

class PermissionRepository extends IRepository {
  constructor() {
    super(Permission);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await Permission.findAll({ where: { Perm_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches"] });
    }
    return await Permission.findAll({ where: { IsDeleted: false }, include: ["Branches"] });
  }

  async getById(id) {
    return await Permission.findByPk(id, { include: ["Branches"] });
  }

  async create(data) {
    try{
      const pk = await PKGenerator.generatePK('Permissions', 'Perm_PK');
      return await Permission.create({
        ...data,
        Perm_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }
  
  async update(id, data) {
    return await Permission.update(data, { where: { Perm_PK: id } });
  }

  async delete(id) {
    return await Permission.update({ IsDeleted: true }, { where: { Perm_PK: id } });
  }
}

module.exports = new PermissionRepository();
