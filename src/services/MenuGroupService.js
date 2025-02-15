const IService = require("./IService");
const menuGroupRepository = require("../repositories/MenuGroupRepository");

class MenuGroupService extends IService {
  async getAll() {
    return await menuGroupRepository.getAll();
  }

  async getById(id) {
    return await menuGroupRepository.getById(id);
  }

  async create(data) {
    return await menuGroupRepository.create(data);
  }

  async update(id, data) {
    return await menuGroupRepository.update(id, data);
  }

  async delete(id) {
    return await menuGroupRepository.delete(id);
  }
}

module.exports = new MenuGroupService();
