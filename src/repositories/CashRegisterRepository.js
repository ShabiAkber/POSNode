const IRepository = require("./IRepository");
const CashRegister = require("../models/CashRegisters");

class CashRegisterRepository extends IRepository {
  constructor() {
    super(CashRegister);
  }

  async getAll(query) {
    return await CashRegister.findAll({ where: { CashReg_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branch"] });
  }

  async getById(id) {
    return await CashRegister.findOne({ where: { CashReg_PK: id, IsDeleted: false }, include: ["Branch"] });
  }

  async create(data) {
    return await CashRegister.create(data);
  }

  async update(id, data) {
    return await CashRegister.update(data, { where: { CashReg_PK: id } });
  }

  async delete(id) {
    return await CashRegister.update({ IsDeleted: true }, { where: { CashReg_PK: id } });
  }
}

module.exports = new CashRegisterRepository();
