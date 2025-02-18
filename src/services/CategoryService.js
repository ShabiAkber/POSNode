const IService = require("./IService");
const categoryRepository = require("../repositories/CategoryRepository");

class CategoryService extends IService {
  constructor() {
    super(categoryRepository);
  }

  async getAll(query) {
    return await categoryRepository.getAll(query);
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
