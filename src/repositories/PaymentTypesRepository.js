const IRepository = require("./IRepository");
const PaymentType = require("../models/PaymentTypes");

class PaymentTypesRepository extends IRepository {
  constructor() {
    super(PaymentType);
  }

  async getAll(query) {
    return await PaymentType.findAll({ where: { PayT_BranchFK: query.BranchId, IsDeleted: false } });
  }

  async getById(id) {
    return await PaymentType.findByPk(id);
  }

  async create(data) {
    return await PaymentType.create(data);
  }

  async update(id, data) {
    const paymentType = await PaymentType.findByPk(id);
    if (!paymentType) return null;
    return await paymentType.update(data);
  }

  async delete(id) {
    const paymentType = await PaymentType.findByPk(id);
    if (!paymentType) return null;
    return await paymentType.update({ IsDeleted: true });
  }
}

module.exports = new PaymentTypesRepository();
