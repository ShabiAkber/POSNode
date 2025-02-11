const IService = require("./IService");
const userRepository = require("../repositories/UserRepository");

class UserService extends IService {
  async getAll() {
    return await userRepository.getAll();
  }

  async getById(id) {
    return await userRepository.getById(id);
  }

  async create(data) {
    return await userRepository.create(data);
  }

  async update(id, data) {
    return await userRepository.update(id, data);
  }

  async delete(id) {
    return await userRepository.delete(id);
  }
}

module.exports = new UserService();
