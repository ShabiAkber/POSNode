const IRepository = require("./IRepository");
const { Department } = require("../models/Departments");

class DepartmentRepository extends IRepository {
  constructor() {
    super(Department);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await Department.findAll({ where: { Dep_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches"] });
    }
    return await Department.findAll({ where: { IsDeleted: false }, include: ["Branches"] });
  }

  async getById(id) {
    return await Department.findOne({ where: { Dep_PK: id, IsDeleted: false }, include: ["Branches"] });
  }

  async create(data) {
    try{
      const pk = await PKGenerator.generatePK('Departments', 'Dep_PK');
      return await Department.create({
        ...data,
        Dep_PK: pk
      });
    } catch (error) {
      throw error;  
    }
  }

  async update(id, data) {
    return await Department.update(data, { where: { Dep_PK: id } });
  }

  async delete(id) {
    return await Department.update({ IsDeleted: true }, { where: { Dep_PK: id } });
  }
}

module.exports = new DepartmentRepository();
