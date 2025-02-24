const IRepository = require("./IRepository");
const WageType = require("../models/WageTypes");

class WageTypeRepository extends IRepository {
  constructor() {
    super(WageType);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await WageType.findAll({ where: { WageT_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches"] });
    }
    return await WageType.findAll({ where: { IsDeleted: false }, include: ["Branches"] });
  }

  async getById(id) {
    return await WageType.findByPk(id, { include: ["Branches"] });
  }

  async create(data) {
    try{
      const pk = await PKGenerator.generatePK('WageTypes', 'WageT_PK');
      return await WageType.create({
        ...data,
        WageT_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }
  
  async update(id, data) {
    return await WageType.update(data, { where: { WageT_PK: id } });
  }

  async delete(id) {
    return await WageType.update({ IsDeleted: true }, { where: { WageT_PK: id } });
  }
}

module.exports = new WageTypeRepository();
