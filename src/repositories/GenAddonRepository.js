const IRepository = require("./IRepository");
const GenAddon = require("../models/GenAddons");

class GenAddonRepository extends IRepository {
  constructor() {
    super(GenAddon);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await GenAddon.findAll({ where: { GenAddon_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branch"] });
    }
    return await GenAddon.findAll({ where: { IsDeleted: false }, include: ["Branch"] });
  }

  async getById(id) {
    return await GenAddon.findOne({ where: { GenAddon_PK: id, IsDeleted: false }, include: ["Branch"] });
  }

  async create(data) {
    return await GenAddon.create(data);
  }

  async update(id, data) {
    return await GenAddon.update(data, { where: { GenAddon_PK: id } });
  }

  async delete(id) {
    return await GenAddon.update({ IsDeleted: true }, { where: { GenAddon_PK: id } });
  }
}

module.exports = new GenAddonRepository();
