const IService = require("./IService");
const genAddonRepository = require("../repositories/GenAddonRepository");

class GenAddonService extends IService {
  constructor() {
    super(genAddonRepository);
  }

  async getAll() {
    return await genAddonRepository.getAll();
  }

  async getById(id) {
    return await genAddonRepository.getById(id);
  }

  async create(data) {
    return await genAddonRepository.create(data);
  }

  async update(id, data) {
    return await genAddonRepository.update(id, data);
  }

  async delete(id) {
    return await genAddonRepository.delete(id);
  }
}

module.exports = new GenAddonService();
