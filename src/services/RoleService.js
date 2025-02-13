const IService = require("../interfaces/IService");
const roleRepository = require("../repositories/RoleRepository");

class RoleService extends IService {
  async getAll() {
    return await roleRepository.findAll();
  }

  async getById(id) {
    return await roleRepository.findById(id);
  }

  async create(data) {
    return await roleRepository.create(data);
  }

  async update(id, data) {
    return await roleRepository.update(id, data);
  }

  async delete(id) {
    return await roleRepository.delete(id);
  }
}

module.exports = new RoleService();
