const IRepository = require("./IRepository");
const Product = require("../models/Products");

class ProductRepository extends IRepository {
  constructor() {
    super(Product);
  }

  async getAll(query) {
    return await Product.findAll({ where: { Prd_BranchFK: query.BranchId, IsDeleted: false }, include: ["Category", "ProductVariant", "ProductAddOn"] });
  }

  async getById(id) {
    return await Product.findOne({ where: { Prd_PK: id, IsDeleted: false }, include: ["Category", "ProductVariant", "ProductAddOn"] });
  }

  async create(data) {
    return await Product.create(data);
  }

  async update(id, data) {
    return await Product.update(data, { where: { Prd_PK: id } });
  }

  async delete(id) {
    return await Product.update({ IsDeleted: true }, { where: { Prd_PK: id } });
  }
}

module.exports = ProductRepository;

