const IRepository = require("./IRepository");
const PaymentStatus = require("../models/PaymentStatuses");

class PaymentStatusesRepository extends IRepository {
  constructor() {
    super(PaymentStatus);
  }

  async getAll() {
    return await PaymentStatus.findAll();
  }

  async getById(id) {
    return await PaymentStatus.findByPk(id);
  }

  async create(data) {
    return await PaymentStatus.create(data);
  }

  async update(id, data) {
    const status = await PaymentStatus.findByPk(id);
    if (!status) return null;
    return await status.update(data);
  }

  async delete(id) {
    const status = await PaymentStatus.findByPk(id);
    if (!status) return null;
    return await status.update({ IsDeleted: true });
  }
}

module.exports = new PaymentStatusesRepository();
