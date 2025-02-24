const IRepository = require("./IRepository");
const GenAddon = require("../models/GenAddons");

class GenAddonRepository extends IRepository {
  constructor() {
    super(GenAddon);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await GenAddon.findAll({ where: { GenAddon_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches"] });
    }
    return await GenAddon.findAll({ where: { IsDeleted: false }, include: ["Branches"] });
  }

  async getById(id) {
    return await GenAddon.findOne({ where: { GenAddon_PK: id, IsDeleted: false }, include: ["Branches"] });
  }

  async create(data) {
    try{
      const pk = await PKGenerator.generatePK('GenAddons', 'GenAddon_PK');
      return await GenAddon.create({
        ...data,
        GenAddon_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    return await GenAddon.update(data, { where: { GenAddon_PK: id } });
  }

  async delete(id) {
    return await GenAddon.update({ IsDeleted: true }, { where: { GenAddon_PK: id } });
  }
}

module.exports = new GenAddonRepository();
