const IRepository = require("./IRepository");
const KitWiseCat = require("../models/KitWiseCats");

class KitWiseCatRepository extends IRepository {
  async getAll() {
    return await KitWiseCat.findAll({ where: { IsDeleted: false }, include: ["Category", "KitchenSection"] });
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
