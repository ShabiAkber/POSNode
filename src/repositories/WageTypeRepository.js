const IRepository = require("./IRepository");
const WageType = require("../models/WageTypes");

class WageTypeRepository extends IRepository {
  constructor() {
    super(WageType);
  }

  async getAll(query) {
    return await WageType.findAll({ where: { WageT_BranchFK: query.BranchId, IsDeleted: false } });
  }

  async getById(id) {
    return await WageType.findByPk(id);
  }

  async create(data) {
    return await WageType.create(data);
  }

  async update(id, data) {
    const wageType = await WageType.findByPk(id);
    if (!wageType) return null;
    await wageType.update(data);
    return wageType;
  }

  async delete(id) {
    const wageType = await WageType.findByPk(id);
    if (!wageType) return null;
    return await wageType.update({ IsDeleted: true });
  }
}

module.exports = new WageTypeRepository();
