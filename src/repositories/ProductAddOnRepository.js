const IRepository = require("./IRepository");
const ProductAddOn = require("../models/ProductAddOns");

class ProductAddOnRepository extends IRepository {
  constructor() {
    super(ProductAddOn);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await ProductAddOn.findAll({ where: { PrdAdd_BranchFK: query.BranchId, IsDeleted: false }, include: ["GenAddons", "Products", "Branches"] });
    }
    return await ProductAddOn.findAll({ where: { IsDeleted: false }, include: ["GenAddons", "Products", "Branches"] });
  }

  async getById(id) {
    return await ProductAddOn.findOne({ where: { PrdAdd_PK: id, IsDeleted: false }, include: ["GenAddons", "Products", "Branches"] });
  }

  async create(data) {
    try{
      const pk = await PKGenerator.generatePK('ProductAddOns', 'PrdAdd_PK');
      return await ProductAddOn.create({
        ...data,
        PrdAdd_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }
  
  async update(id, data) {
    return await ProductAddOn.update(data, { where: { PrdAdd_PK: id } });
  }

  async delete(id) {
    return await ProductAddOn.update({ IsDeleted: true }, { where: { PrdAdd_PK: id } });
  }
}

module.exports = ProductAddOnRepository;
