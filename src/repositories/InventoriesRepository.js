const IRepository = require("./IRepository");
const Inventories = require("../models/Inventories");

class InventoriesRepository extends IRepository {
  constructor() {
    super(Inventories);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await Inventories.findAll({ where: { Inv_BranchFK: query.BranchId, IsDeleted: false }, include: ["Categories", "Branches"] });
    }
    return await Inventories.findAll({ where: { IsDeleted: false }, include: ["Categories", "Branches"] });
  }

  async getById(id) {
    return await Inventories.findOne({ where: { Inv_PK: id, IsDeleted: false }, include: ["Categories", "Branches"] });
  }

  async create(data) {  
    try{
      const pk = await PKGenerator.generatePK('Inventories', 'Inv_PK');
      return await Inventories.create({
        ...data,
        Inv_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    return await Inventories.update(data, { where: { Inv_PK: id } });
  }

  async delete(id) {
    return await Inventories.update({ IsDeleted: true }, { where: { Inv_PK: id } });
  }
}

module.exports = new InventoriesRepository();
