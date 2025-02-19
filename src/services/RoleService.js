const IService = require("./IService");
const roleRepository = require("../repositories/RoleRepository");

class RoleService extends IService {
  constructor() {
    super(roleRepository);
  }

  async getAll(query) {
    return await roleRepository.getAll(query);
  }

  async getById(id) {
    return await roleRepository.getById(id);
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
