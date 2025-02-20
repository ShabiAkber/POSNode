const IService = require("./IService");
const menuGroupRepository = require("../repositories/MenuGroupRepository");

class MenuGroupService extends IService {
  constructor() {
    super(menuGroupRepository);
  }

  async getAll(query) {
    return await menuGroupRepository.getAll(query);
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
