const IRepository = require("./IRepository");
const GenAddon = require("../models/GenAddons");

class GenAddonRepository extends IRepository {
  constructor() {
    super(GenAddon);
  }

  async getAll() {
    return await GenAddon.findAll({ where: { IsDeleted: false } });
  }

  async getById(id) {
    return await GenAddon.findOne({ where: { GenAddon_PK: id, IsDeleted: false } });
  }

  async create(data) {
    return await GenAddon.create(data);
  }

  async update(id, data) {
    const genAddon = await GenAddon.findByPk(id);
    if (!genAddon) return null;
    return await genAddon.update(data);
  }

  async delete(id) {
    const genAddon = await GenAddon.findByPk(id);
    if (!genAddon) return null;
    return await genAddon.update({ IsDeleted: true });
  }
}

module.exports = new GenAddonRepository();
