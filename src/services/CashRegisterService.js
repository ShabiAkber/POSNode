const IService = require("./IService");
const cashRegisterRepository = require("../repositories/CashRegisterRepository");

class CashRegisterService extends IService {
  constructor() {
    super(cashRegisterRepository);
  }

  async getAll(query) {
    return await cashRegisterRepository.getAll(query);
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
