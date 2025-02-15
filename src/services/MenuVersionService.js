const IService = require("./IService");
const menuVersionRepository = require("../repositories/MenuVersionRepository");

class MenuVersionService extends IService {
  async getAll() {
    return await menuVersionRepository.getAll();
  }

  async getById(id) {
    return await menuVersionRepository.getById(id);
  }

  async create(data) {
    return await menuVersionRepository.create(data);
  }

  async update(id, data) {
    return await menuVersionRepository.update(id, data);
  }

  async delete(id) {
    return await menuVersionRepository.delete(id);
  }
}

module.exports = new MenuVersionService();
