const IService = require("./IService");
const paymentStatusesRepository = require("../repositories/PaymentStatusesRepository");

class PaymentStatusesService extends IService {
  constructor() {
    super(paymentStatusesRepository);
  }

  async getAll() {
    return await paymentStatusesRepository.findAll();
  }

  async getById(id) {
    return await paymentStatusesRepository.findById(id);
  }

  async create(data) {
    return await paymentStatusesRepository.create(data);
  }

  async update(id, data) {
    return await paymentStatusesRepository.update(id, data);
  }

  async delete(id) {
    return await paymentStatusesRepository.delete(id);
  }
}

module.exports = new PaymentStatusesService();
