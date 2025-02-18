const IService = require("./IService");
const permissionRepository = require("../repositories/PermissionRepository");

class PermissionService extends IService {
  constructor() {
    super(permissionRepository);
  }

  async getAll() {
    return await permissionRepository.findAll();
  }

  async getById(id) {
    return await permissionRepository.findById(id);
  }

  async create(data) {
    return await permissionRepository.create(data);
  }

  async update(id, data) {
    return await permissionRepository.update(id, data);
  }

  async delete(id) {
    return await permissionRepository.delete(id);
  }
}

module.exports = new PermissionService();
