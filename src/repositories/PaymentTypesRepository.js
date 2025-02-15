const IRepository = require("./IRepository");
const PaymentTypes = require("../models/PaymentTypes");

class PaymentTypesRepository extends IRepository {
  async findAll() {
    return await PaymentTypes.findAll();
  }

  async findById(id) {
    return await PaymentTypes.findByPk(id);
  }

  async create(data) {
    return await PaymentTypes.create(data);
  }

  async update(id, data) {
    const paymentType = await this.findById(id);
    if (!paymentType) return null;
    return await paymentType.update(data);
  }

  async delete(id) {
    const paymentType = await this.findById(id);
    if (!paymentType) return null;
    return await paymentType.destroy();
  }
}

module.exports = new PaymentTypesRepository();
