const IRepository = require("./IRepository");
const { WageType } = require("../models");

class WageTypeRepository extends IRepository {
  async getAll() {
    return await WageType.findAll();
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
    await wageType.destroy();
    return { message: "Wage Type deleted successfully" };
  }
}

module.exports = new WageTypeRepository();
