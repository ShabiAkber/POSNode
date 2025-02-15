const IService = require("./IService");
const orderStatusesRepository = require("../repositories/OrderStatusesRepository");

class OrderStatusesService extends IService {
  async getAll() {
    return await orderStatusesRepository.findAll();
  }

  async getById(id) {
    return await orderStatusesRepository.findById(id);
  }

  async create(data) {
    return await orderStatusesRepository.create(data);
  }

  async update(id, data) {
    return await orderStatusesRepository.update(id, data);
  }

  async delete(id) {
    return await orderStatusesRepository.delete(id);
  }
}

module.exports = new OrderStatusesService();
