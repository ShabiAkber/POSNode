const IRepository = require("./IRepository");
const CashTransaction = require("../models/CashTransactions");

class CashTransactionRepository extends IRepository {
  async getAll() {
    return await CashTransaction.findAll();
  }

  async getById(id) {
    return await CashTransaction.findOne({ where: { CashTrans_PK: id } });
  }

  async create(data) {
    return await CashTransaction.create(data);
  }

  async update(id, data) {
    const cashTransaction = await CashTransaction.findByPk(id);
    if (!cashTransaction) return null;
    return await cashTransaction.update(data);
  }

  async delete(id) {
    const cashTransaction = await CashTransaction.findByPk(id);
    if (!cashTransaction) return null;
    return await cashTransaction.destroy();
  }
}

module.exports = new CashTransactionRepository();
