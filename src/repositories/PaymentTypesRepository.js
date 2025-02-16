const IRepository = require("./IRepository");
const PaymentTypes = require("../models/PaymentTypes");

class PaymentTypesRepository extends IRepository {
  async getAll() {
    return await PaymentTypes.findAll();
  }

  async getById(id) {
    return await PaymentTypes.findByPk(id);
  }

  async create(data) {
    return await PaymentTypes.create(data);
  }

  async update(id, data) {
    const paymentType = await PaymentTypes.findByPk(id);
    if (!paymentType) return null;
    return await paymentType.update(data);
  }

  async delete(id) {
    const paymentType = await PaymentTypes.findByPk(id);
    if (!paymentType) return null;
    return await paymentType.destroy();
  }
}

module.exports = new PaymentTypesRepository();
