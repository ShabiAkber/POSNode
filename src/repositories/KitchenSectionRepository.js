const IRepository = require("./IRepository");
const KitchenSection = require("../models/KitchenSections");

class KitchenSectionRepository extends IRepository {
  async getAll() {
    return await KitchenSection.findAll({ where: { IsDeleted: false } });
  }

  async getById(id) {
    return await KitchenSection.findOne({ where: { KitSec_PK: id, IsDeleted: false } });
  }

  async create(data) {
    return await KitchenSection.create(data);
  }

  async update(id, data) {
    const kitchenSection = await KitchenSection.findByPk(id);
    if (!kitchenSection) return null;
    return await kitchenSection.update(data);
  }

  async delete(id) {
    const kitchenSection = await KitchenSection.findByPk(id);
    if (!kitchenSection) return null;
    return await kitchenSection.update({ IsDeleted: true });
  }
}

module.exports = new KitchenSectionRepository();
