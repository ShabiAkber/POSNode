const IService = require("./IService");
const departmentRepository = require("../repositories/DepartmentRepository");

class DepartmentService extends IService {
  constructor() {
    super(departmentRepository);
  }

  async getAll(query) {
    return await departmentRepository.getAll(query);
  }

  async getById(id) {
    return await departmentRepository.getById(id);
  }

  async create(data) {
    return await departmentRepository.create(data);
  }

  async update(id, data) {
    return await departmentRepository.update(id, data);
  }

  async delete(id) {
    return await departmentRepository.delete(id);
  }
}

module.exports = new DepartmentService();
