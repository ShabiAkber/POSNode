const IService = require("./IService");
const userTypeRepository = require("../repositories/UserTypeRepository");

class UserTypeService extends IService {
  constructor() {
    super(userTypeRepository);
  }

  async getAll() {
    return await userTypeRepository.getAll();
  }

  async getById(id) {
    return await userTypeRepository.getById(id);
  }

  async create(data) {
    return await userTypeRepository.create(data);
  }

  async update(id, data) {
    return await userTypeRepository.update(id, data);
  }

  async delete(id) {
    return await userTypeRepository.delete(id);
  }
}

module.exports = new UserTypeService();
