const IService = require("./IService");
const ProductRepository = require("../repositories/ProductRepository");

class ProductService extends IService {
  constructor() {
    super(ProductRepository);
  }

  async getAll(query) {
    return await ProductRepository.getAll(query);
  }

  async getById(id) {
    return await ProductRepository.getById(id);
  }

  async create(data) {
    return await ProductRepository.create(data);
  }

  async update(id, data) {
    return await ProductRepository.update(id, data);
  }

  async delete(id) {
    return await ProductRepository.delete(id);
  }
}

module.exports = new ProductService();
