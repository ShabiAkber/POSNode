const IRepository = require("./IRepository");
const PaymentStatuses = require("../models/PaymentStatuses");

class PaymentStatusesRepository extends IRepository {
  async findAll() {
    return await PaymentStatuses.findAll();
  }

  async findById(id) {
    return await PaymentStatuses.findByPk(id);
  }

  async create(data) {
    return await PaymentStatuses.create(data);
  }

  async update(id, data) {
    const status = await this.findById(id);
    if (!status) return null;
    return await status.update(data);
  }

  async delete(id) {
    const status = await this.findById(id);
    if (!status) return null;
    return await status.destroy();
  }
}

module.exports = new PaymentStatusesRepository();
