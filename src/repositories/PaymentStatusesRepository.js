const IRepository = require("./IRepository");
const PaymentStatuses = require("../models/PaymentStatuses");

class PaymentStatusesRepository extends IRepository {
  async getAll() {
    return await PaymentStatuses.findAll();
  }

  async getById(id) {
    return await PaymentStatuses.findByPk(id);
  }

  async create(data) {
    return await PaymentStatuses.create(data);
  }

  async update(id, data) {
    const status = await PaymentStatuses.findByPk(id);
    if (!status) return null;
    return await status.update(data);
  }

  async delete(id) {
    const status = await PaymentStatuses.findByPk(id);
    if (!status) return null;
    return await status.destroy();
  }
}

module.exports = new PaymentStatusesRepository();
