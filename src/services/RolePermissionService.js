const IService = require("./IService");
const rolePermissionRepository = require("../repositories/RolePermissionRepository");

class RolePermissionService extends IService {
  async getAll() {
    return await rolePermissionRepository.findAll();
  }

  async getById(id) {
    return await rolePermissionRepository.findById(id);
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
