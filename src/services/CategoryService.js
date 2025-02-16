const IService = require("./IService");
const categoryRepository = require("../repositories/CategoryRepository");

class CategoryService extends IService {
  async getAll() {
    return await categoryRepository.getAll();
  }

  async getById(id) {
    return await categoryRepository.getById(id);
  }

  async create(data) {
    return await categoryRepository.create(data);
  }

  async update(id, data) {
    return await categoryRepository.update(id, data);
  }

  async delete(id) {
    return await categoryRepository.delete(id);
  }
}

module.exports = new CategoryService();
