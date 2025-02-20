const IService = require("./IService");
const ProductVariantRepository = require("../repositories/ProductVariantRepository");

class ProductVariantService extends IService {
  constructor() {
    super(ProductVariantRepository);
  }

  async getAll(query) {
    return await ProductVariantRepository.getAll(query);
  }

  async getById(id) {
    return await ProductVariantRepository.getById(id);
  }

  async create(data) {
    return await ProductVariantRepository.create(data);
  }

  async update(id, data) {
    return await ProductVariantRepository.update(id, data);
  }

  async delete(id) {
    return await ProductVariantRepository.delete(id);
  }
}

module.exports = new ProductVariantService();
