const IService = require("./IService");
const ProductAddOnRepository = require("../repositories/ProductAddOnRepository");

class ProductAddOnService extends IService {
  constructor() {
    super(ProductAddOnRepository);
  }

  async getAll(query) {
    return await ProductAddOnRepository.getAll(query);
  }

  async getById(id) {
    return await ProductAddOnRepository.getById(id);
  }

  async create(data) {
    return await ProductAddOnRepository.create(data);
  }

  async update(id, data) {
    return await ProductAddOnRepository.update(id, data);
  }

  async delete(id) {
    return await ProductAddOnRepository.delete(id);
  }
}

module.exports = new ProductAddOnService();
