const IRepository = require("./IRepository");
const KitWiseCat = require("../models/KitWiseCats");

class KitWiseCatRepository extends IRepository {
  constructor() {
    super(KitWiseCat);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await KitWiseCat.findAll({ where: { KitSecCat_BranchFK: query.BranchId, IsDeleted: false }, include: ["Category", "KitchenSection", "Branch"] });
    }
    return await KitWiseCat.findAll({ where: { IsDeleted: false }, include: ["Category", "KitchenSection", "Branch"] });
  }

  async getById(id) {
    return await KitWiseCat.findOne({ where: { KitSecCat_PK: id, IsDeleted: false }, include: ["Category", "KitchenSection", "Branch"] });
  }

  async create(data) {
    return await KitWiseCat.create(data);
  }

  async update(id, data) {
    return await KitWiseCat.update(data, { where: { KitSecCat_PK: id } });
  }

  async delete(id) {
    return await KitWiseCat.update({ IsDeleted: true }, { where: { KitSecCat_PK: id } });
  }
}

module.exports = new KitWiseCatRepository();
