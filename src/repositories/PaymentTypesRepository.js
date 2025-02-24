const IRepository = require("./IRepository");
const PaymentType = require("../models/PaymentTypes");

class PaymentTypesRepository extends IRepository {
  constructor() {
    super(PaymentType);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await PaymentType.findAll({ where: { PayT_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches"] });
    }
    return await PaymentType.findAll({ where: { IsDeleted: false }, include: ["Branches"] });
  }

  async getById(id) {
    return await PaymentType.findByPk(id, { include: ["Branches"] });
  }

  async create(data) {
    try{
      const pk = await PKGenerator.generatePK('PaymentTypes', 'PayT_PK');
      return await PaymentType.create({
        ...data,
        PayT_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    return await PaymentType.update(data, { where: { PayT_PK: id } });
  }

  async delete(id) {
    return await PaymentType.update({ IsDeleted: true }, { where: { PayT_PK: id } });
  }
}

module.exports = new PaymentTypesRepository();
