const IService = require("./IService");
const userRepository = require("../repositories/UserRepository");

class UserService extends IService {
  constructor() {
    super(userRepository);
  }

  async getAll(query) {
    return await userRepository.getAll(query);
  }

  async getById(id) {
    return await userRepository.getById(id);
  }

  async findByEmail(email) {
    return await userRepository.findByEmail(email);
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
