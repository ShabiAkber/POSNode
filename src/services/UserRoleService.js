const IService = require("./IService");
const userRoleRepository = require("../repositories/UserRoleRepository");

class UserRoleService extends IService {
  async getAll() {
    return await userRoleRepository.findAll();
  }

  async getById(id) {
    return await userRoleRepository.findById(id);
  }

  async create(data) {
    return await userRoleRepository.create(data);
  }

  async update(id, data) {
    return await userRoleRepository.update(id, data);
  }

  async delete(id) {
    return await userRoleRepository.delete(id);
  }
}

module.exports = new UserRoleService();
