const IRepository = require("./IRepository");
const KitWiseCat = require("../models/KitWiseCats");

class KitWiseCatRepository extends IRepository {
  constructor() {
    super(KitWiseCat);
  }

  async getAll(query) {
    return await KitWiseCat.findAll({ where: { KitSecCat_BranchFK: query.BranchId, KitSecCat_CatFK: query.CategoryId, KitSecCat_KitSecFK: query.KitchenSectionId, IsDeleted: false }, include: ["Category", "KitchenSection"] });
  }

  async getById(id) {
    return await KitWiseCat.findOne({ where: { KitSecCat_PK: id, IsDeleted: false }, include: ["Category", "KitchenSection"] });
  }

  async create(data) {
    return await KitWiseCat.create(data);
  }

  async update(id, data) {
    const kitWiseCat = await KitWiseCat.findByPk(id);
    if (!kitWiseCat) return null;
    return await kitWiseCat.update(data);
  }

  async delete(id) {
    const kitWiseCat = await KitWiseCat.findByPk(id);
    if (!kitWiseCat) return null;
    return await kitWiseCat.update({ IsDeleted: true });
  }
}

module.exports = new KitWiseCatRepository();
