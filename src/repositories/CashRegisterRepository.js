const IRepository = require("./IRepository");
const CashRegister = require("../models/CashRegisters");

class CashRegisterRepository extends IRepository {
  constructor() {
    super(CashRegister);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await CashRegister.findAll({ where: { CashReg_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches"] });
    }
    return await CashRegister.findAll({ where: { IsDeleted: false }, include: ["Branches"] });
  }

  async getById(id) {
    return await CashRegister.findOne({ where: { CashReg_PK: id, IsDeleted: false }, include: ["Branch"] });
  }

  async create(data) {
    try{
      const pk = await PKGenerator.generatePK('CashRegisters', 'CashReg_PK');
      return await CashRegister.create({
        ...data,
        CashReg_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    return await CashRegister.update(data, { where: { CashReg_PK: id } });
  }

  async delete(id) {
    return await CashRegister.update({ IsDeleted: true }, { where: { CashReg_PK: id } });
  }
}

module.exports = new CashRegisterRepository();
