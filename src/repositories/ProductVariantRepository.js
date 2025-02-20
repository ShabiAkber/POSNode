const IRepository = require("./IRepository");
const ProductVariant = require("../models/ProductVariants");

class ProductVariantRepository extends IRepository {
  constructor() {
    super(ProductVariant);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await ProductVariant.findAll({ where: { PrdVar_BranchFK: query.BranchId, IsDeleted: false }, include: ["Product"] });
    }
    return await ProductVariant.findAll({ where: { IsDeleted: false }, include: ["Product"] });
  }

  async getById(id) {
    return await ProductVariant.findOne({ where: { PrdVar_PK: id, IsDeleted: false }, include: ["Product"] });
  }

  async create(data) {
    return await ProductVariant.create(data);
  }

  async update(id, data) {
    return await ProductVariant.update(data, { where: { PrdVar_PK: id } });
  }

  async delete(id) {
    return await ProductVariant.update({ IsDeleted: true }, { where: { PrdVar_PK: id } });
  }
}

module.exports = ProductVariantRepository;
