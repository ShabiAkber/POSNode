const IRepository = require("./IRepository");
const CashTransaction = require("../models/CashTransactions");

class CashTransactionRepository extends IRepository {
  constructor() {
    super(CashTransaction);
  }

  async getAll(query) {
    return await CashTransaction.findAll({ where: { CashTrans_BranchFK: query.BranchId, IsDeleted: false } });
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
    return await cashTransaction.update({ IsDeleted: true });
  }
}

module.exports = new CashTransactionRepository();
