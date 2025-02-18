const IRepository = require("./IRepository");
const Inventories = require("../models/Inventories");

class InventoriesRepository extends IRepository {
  constructor() {
    super(Inventories);
  }

  async getAll() {
    return await Inventories.findAll({ where: { IsDeleted: false }, include: ["Categories"] });
  }

  async getById(id) {
    return await Inventories.findOne({ where: { Inv_PK: id, IsDeleted: false }, include: ["Categories"] });
  }

  async create(data) {
    return await Inventories.create(data);
  }

  async update(id, data) {
    const inventory = await Inventories.findByPk(id);
    if (!inventory) return null;
    return await inventory.update(data);
  }

  async delete(id) {
    const inventory = await Inventories.findByPk(id);
    if (!inventory) return null;
    return await inventory.update({ IsDeleted: true });
  }
}

module.exports = new InventoriesRepository();
