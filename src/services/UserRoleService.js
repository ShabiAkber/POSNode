const IService = require("./IService");
const userRoleRepository = require("../repositories/UserRoleRepository");

class UserRoleService extends IService {
  constructor() {
    super(userRoleRepository);
  }

  async getAll(query) {
    return await userRoleRepository.getAll(query);
  }

  async getById(id) {
    return await userRoleRepository.getById(id);
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
