const IService = require("./IService");
const kitWiseCatRepository = require("../repositories/KitWiseCatRepository");

class KitWiseCatService extends IService {
  async getAll() {
    return await kitWiseCatRepository.getAll();
  }

  async getById(id) {
    return await kitWiseCatRepository.getById(id);
  }

  async create(data) {
    return await kitWiseCatRepository.create(data);
  }

  async update(id, data) {
    return await kitWiseCatRepository.update(id, data);
  }

  async delete(id) {
    return await kitWiseCatRepository.delete(id);
  }
}

module.exports = new KitWiseCatService();
