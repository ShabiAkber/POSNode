const IService = require("./IService");
const cashRegisterRepository = require("../repositories/CashRegisterRepository");

class CashRegisterService extends IService {
  async getAll() {
    return await cashRegisterRepository.getAll();
  }

  async getById(id) {
    return await cashRegisterRepository.getById(id);
  }

  async create(data) {
    return await cashRegisterRepository.create(data);
  }

  async update(id, data) {
    return await cashRegisterRepository.update(id, data);
  }

  async delete(id) {
    return await cashRegisterRepository.delete(id);
  }
}

module.exports = new CashRegisterService();
