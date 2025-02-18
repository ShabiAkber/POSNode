const IRepository = require("./IRepository");
const CashRegister = require("../models/CashRegisters");

class CashRegisterRepository extends IRepository {
  constructor() {
    super(CashRegister);
  }

  async getAll() {
    return await CashRegister.findAll({ where: { IsDeleted: false } });
  }

  async getById(id) {
    return await CashRegister.findOne({ where: { CashReg_PK: id, IsDeleted: false } });
  }

  async create(data) {
    return await CashRegister.create(data);
  }

  async update(id, data) {
    const cashRegister = await CashRegister.findByPk(id);
    if (!cashRegister) return null;
    return await cashRegister.update(data);
  }

  async delete(id) {
    const cashRegister = await CashRegister.findByPk(id);
    if (!cashRegister) return null;
    return await cashRegister.update({ IsDeleted: true });
  }
}

module.exports = new CashRegisterRepository();
