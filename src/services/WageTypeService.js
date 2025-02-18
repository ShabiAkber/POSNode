const IService = require("./IService");
const wageTypeRepository = require("../repositories/WageTypeRepository");

class WageTypeService extends IService {
  constructor() {
    super(wageTypeRepository);
  }

  async getAll() {
    return await wageTypeRepository.getAll();
  }

  async getById(id) {
    return await wageTypeRepository.getById(id);
  }

  async create(data) {
    return await wageTypeRepository.create(data);
  }

  async update(id, data) {
    return await wageTypeRepository.update(id, data);
  }

  async delete(id) {
    return await wageTypeRepository.delete(id);
  }
}

module.exports = new WageTypeService();
