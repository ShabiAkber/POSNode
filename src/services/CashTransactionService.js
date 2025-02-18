const IService = require("./IService");
const cashTransactionRepository = require("../repositories/CashTransactionRepository");

class CashTransactionService extends IService {
  constructor() {
    super(cashTransactionRepository);
  }

  async getAll(query) {
    return await cashTransactionRepository.getAll(query);
  }

  async getById(id) {
    return await cashTransactionRepository.getById(id);
  }

  async create(data) {
    return await cashTransactionRepository.create(data);
  }

  async update(id, data) {
    return await cashTransactionRepository.update(id, data);
  }

  async delete(id) {
    return await cashTransactionRepository.delete(id);
  }
}

module.exports = new CashTransactionService();
