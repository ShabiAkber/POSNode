const IRepository = require("./IRepository");
const Category = require("../models/Categories");

class CategoryRepository extends IRepository {
  constructor() {
    super(Category);
  }

  async getAll(query) {
    return await Category.findAll({ where: { Cat_BranchFK: query.BranchId, IsDeleted: false } });
  }

  async getById(id) {
    return await Category.findOne({ where: { Cat_PK: id, IsDeleted: false } });
  }

  async create(data) {
    return await Category.create(data);
  }

  async update(id, data) {
    const category = await Category.findByPk(id);
    if (!category) return null;
    return await category.update(data);
  }

  async delete(id) {
    const category = await Category.findByPk(id);
    if (!category) return null;
    return await category.update({ IsDeleted: true });
  }
}

module.exports = new CategoryRepository();
