const IService = require("./IService");
const rolePermissionRepository = require("../repositories/RolePermissionRepository");

class RolePermissionService extends IService {
  constructor() {
    super(rolePermissionRepository);
  }

  async getAll(query) {
    return await rolePermissionRepository.getAll(query);
  }

  async getById(id) {
    return await rolePermissionRepository.getById(id);
  }

  async create(data) {
    return await rolePermissionRepository.create(data);
  }

  async update(id, data) {
    return await rolePermissionRepository.update(id, data);
  }

  async delete(id) {
    return await rolePermissionRepository.delete(id);
  }
}

module.exports = new RolePermissionService();
