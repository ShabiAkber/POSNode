const IRepository = require("./IRepository");
const { Department } = require("../models/Departments");

class DepartmentRepository extends IRepository {
  async getAll() {
    return await Department.findAll();
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
    await department.destroy();
    return { message: "Department deleted successfully" };
  }
}

module.exports = new DepartmentRepository();
