const IRepository = require("./IRepository");
const ProductVariant = require("../models/ProductVariants");

class ProductVariantRepository extends IRepository {
  constructor() {
    super(ProductVariant);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await ProductVariant.findAll({ where: { PrdVar_BranchFK: query.BranchId, IsDeleted: false }, include: ["Products", "Branches"] });
    }
    return await ProductVariant.findAll({ where: { IsDeleted: false }, include: ["Products", "Branches"] });
  }

  async getById(id) {
    return await ProductVariant.findOne({ where: { PrdVar_PK: id, IsDeleted: false }, include: ["Products", "Branches"] });
  }

  async create(data) {
    try{
      const pk = await PKGenerator.generatePK('ProductVariants', 'PrdVar_PK');
      return await ProductVariant.create({
        ...data,
        PrdVar_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }
  
  async update(id, data) {
    return await ProductVariant.update(data, { where: { PrdVar_PK: id } });
  }

  async delete(id) {
    return await ProductVariant.update({ IsDeleted: true }, { where: { PrdVar_PK: id } });
  }
}

module.exports = ProductVariantRepository;
