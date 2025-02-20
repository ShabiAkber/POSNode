const IRepository = require("./IRepository");
const KitchenSection = require("../models/KitchenSections");

class KitchenSectionRepository extends IRepository {
  constructor() {
    super(KitchenSection);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await KitchenSection.findAll({ where: { KitSec_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branch"] });
    }
    return await KitchenSection.findAll({ where: { IsDeleted: false }, include: ["Branch"] });
  }

  async getById(id) {
    return await KitchenSection.findOne({ where: { KitSec_PK: id, IsDeleted: false }, include: ["Branch"] });
  }

  async create(data) {
    return await KitchenSection.create(data);
  }

  async update(id, data) {
    return await KitchenSection.update(data, { where: { KitSec_PK: id } });
  }

  async delete(id) {
    return await KitchenSection.update({ IsDeleted: true }, { where: { KitSec_PK: id } });
  }
}

module.exports = new KitchenSectionRepository();
