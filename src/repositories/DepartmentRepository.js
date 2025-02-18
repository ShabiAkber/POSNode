const IRepository = require("./IRepository");
const { Department } = require("../models/Departments");

class DepartmentRepository extends IRepository {
  constructor() {
    super(Department);
  }

  async getAll(query) {
    return await Department.findAll({ where: { Dep_BranchFK: query.BranchId, IsDeleted: false } });
  }

  async getById(id) {
    return await Department.findByPk(id);
  }

  async create(data) {
    return await Department.create(data);
  }

  async update(id, data) {
    const department = await this.getById(id);
    if (!department) return null;
    return await department.update(data);
  }

  async delete(id) {
    const department = await this.getById(id);
    if (!department) return null;
    return await department.update({ IsDeleted: true });
  }
}

module.exports = new DepartmentRepository();
