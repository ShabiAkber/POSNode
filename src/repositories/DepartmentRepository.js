const IRepository = require("./IRepository");
const { Department } = require("../models/Departments");

class DepartmentRepository extends IRepository {
  constructor() {
    super(Department);
  }

  async getAll(query) {
    return await Department.findAll({ where: { Dep_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branch"] });
  }

  async getById(id) {
    return await Department.findOne({ where: { Dep_PK: id, IsDeleted: false }, include: ["Branch"] });
  }

  async create(data) {
    return await Department.create(data);
  }

  async update(id, data) {
    return await Department.update(data, { where: { Dep_PK: id } });
  }

  async delete(id) {
    return await Department.update({ IsDeleted: true }, { where: { Dep_PK: id } });
  }
}

module.exports = new DepartmentRepository();
