const IRepository = require("./IRepository");
const WageType = require("../models/WageTypes");

class WageTypeRepository extends IRepository {
  constructor() {
    super(WageType);
  }

  async getAll(query) {
    return await WageType.findAll({ where: { WageT_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branch"] });
  }

  async getById(id) {
    return await WageType.findByPk(id, { include: ["Branch"] });
  }

  async create(data) {
    return await WageType.create(data);
  }

  async update(id, data) {
    return await WageType.update(data, { where: { WageT_PK: id } });
  }

  async delete(id) {
    return await WageType.update({ IsDeleted: true }, { where: { WageT_PK: id } });
  }
}

module.exports = new WageTypeRepository();
