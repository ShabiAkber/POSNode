const IRepository = require("./IRepository");
const CashTransaction = require("../models/CashTransactions");

class CashTransactionRepository extends IRepository {
  constructor() {
    super(CashTransaction);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await CashTransaction.findAll({ where: { CashTrans_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches"] });
    }
    return await CashTransaction.findAll({ where: { IsDeleted: false }, include: ["Branches"] });
  }

  async getById(id) {
    return await CashTransaction.findOne({ where: { CashTrans_PK: id, IsDeleted: false }, include: ["Branches"] });
  }

  async create(data) {
    return await CashTransaction.create(data);
  }

  async update(id, data) {
    return await CashTransaction.update(data, { where: { CashTrans_PK: id } });
  }

  async delete(id) {
    return await CashTransaction.update({ IsDeleted: true }, { where: { CashTrans_PK: id } });
  }
}

module.exports = new CashTransactionRepository();
