const IRepository = require("./IRepository");
const KitchenSection = require("../models/KitchenSections");

class KitchenSectionRepository extends IRepository {
  constructor() {
    super(KitchenSection);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await KitchenSection.findAll({ where: { KitSec_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches"] });
    }
    return await KitchenSection.findAll({ where: { IsDeleted: false }, include: ["Branches"] });
  }

  async getById(id) {
    return await KitchenSection.findOne({ where: { KitSec_PK: id, IsDeleted: false }, include: ["Branches"] });
  }

  async create(data) {  
    try{
      const pk = await PKGenerator.generatePK('KitchenSections', 'KitSec_PK');
      return await KitchenSection.create({
        ...data,
        KitSec_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    return await KitchenSection.update(data, { where: { KitSec_PK: id } });
  }

  async delete(id) {
    return await KitchenSection.update({ IsDeleted: true }, { where: { KitSec_PK: id } });
  }
}

module.exports = new KitchenSectionRepository();
