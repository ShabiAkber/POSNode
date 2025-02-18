const IService = require("./IService");
const inventoriesRepository = require("../repositories/InventoriesRepository");

class InventoriesService extends IService {
  constructor() {
    super(inventoriesRepository);
  }

  async getAll(query) {
    return await inventoriesRepository.getAll(query);
  }

  async getById(id) {
    return await inventoriesRepository.getById(id);
  }

  async create(data) {
    return await inventoriesRepository.create(data);
  }

  async update(id, data) {
    return await inventoriesRepository.update(id, data);
  }

  async delete(id) {
    return await inventoriesRepository.delete(id);
  }
}

module.exports = new InventoriesService();
