const IService = require("./IService");
const kitchenSectionRepository = require("../repositories/KitchenSectionRepository");

class KitchenSectionService extends IService {
  constructor() {
    super(kitchenSectionRepository);
  }

  async getAll(query) {
    return await kitchenSectionRepository.getAll(query);
  }

  async getById(id) {
    return await kitchenSectionRepository.getById(id);
  }

  async create(data) {
    return await kitchenSectionRepository.create(data);
  }

  async update(id, data) {
    return await kitchenSectionRepository.update(id, data);
  }

  async delete(id) {
    return await kitchenSectionRepository.delete(id);
  }
}

module.exports = new KitchenSectionService();
