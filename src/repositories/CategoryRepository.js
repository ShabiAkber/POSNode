const IRepository = require("./IRepository");
const Category = require("../models/Categories");

class CategoryRepository extends IRepository {
  constructor() {
    super(Category);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await Category.findAll({ where: { Cat_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches", "MenuGroups"] });
    }
    return await Category.findAll({ where: { IsDeleted: false }, include: ["Branches", "MenuGroups"] });
  }

  async getById(id) {
    return await Category.findOne({ where: { Cat_PK: id, IsDeleted: false }, include: ["Branches", "MenuGroups"] });
  }

  async create(data) {
    return await Category.create(data);
  }

  async update(id, data) {
    return await Category.update(data, { where: { Cat_PK: id } });
  }

  async delete(id) {
    return await Category.update({ IsDeleted: true }, { where: { Cat_PK: id } });
  }
}

module.exports = new CategoryRepository();
