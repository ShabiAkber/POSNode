const IService = require("./IService");
const paymentTypesRepository = require("../repositories/PaymentTypesRepository");

class PaymentTypesService extends IService {
  constructor() {
    super(paymentTypesRepository);
  }

  async getAll() {
    return await paymentTypesRepository.findAll();
  }

  async getById(id) {
    return await paymentTypesRepository.findById(id);
  }

  async create(data) {
    return await paymentTypesRepository.create(data);
  }

  async update(id, data) {
    return await paymentTypesRepository.update(id, data);
  }

  async delete(id) {
    return await paymentTypesRepository.delete(id);
  }
}

module.exports = new PaymentTypesService();
