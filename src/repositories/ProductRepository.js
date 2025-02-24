const IRepository = require("./IRepository");
const Product = require("../models/Products");

class ProductRepository extends IRepository {
  constructor() {
    super(Product);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await Product.findAll({ where: { Prd_BranchFK: query.BranchId, IsDeleted: false }, include: ["Categories", "ProductVariants", "ProductAddOns", "Branches"] });
    }
    return await Product.findAll({ where: { IsDeleted: false }, include: ["Categories", "ProductVariants", "ProductAddOns", "Branches"] });
  }

  async getById(id) {
      return await Product.findOne({ where: { Prd_PK: id, IsDeleted: false }, include: ["Categories", "ProductVariants", "ProductAddOns", "Branches"] });
  }

  async create(data) {
    try{
      const pk = await PKGenerator.generatePK('Products', 'Prd_PK');
      return await Product.create({
        ...data,
        Prd_PK: pk
      });
    } catch (error) {
      throw error;
    } 
  }

  async update(id, data) {
    return await Product.update(data, { where: { Prd_PK: id } });
  }

  async delete(id) {
    return await Product.update({ IsDeleted: true }, { where: { Prd_PK: id } });
  }
}

module.exports = ProductRepository;

