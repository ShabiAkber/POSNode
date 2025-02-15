const IService = require("./IService");
const orderRepository = require("../repositories/OrderRepository");

class OrderService extends IService {
  async getAll() {
    return await orderRepository.findAll();
  }

  async getById(id) {
    return await orderRepository.findById(id);
  }

  async create(data) {
    return await orderRepository.create(data);
  }

  async update(id, data) {
    return await orderRepository.update(id, data);
  }

  async delete(id) {
    return await orderRepository.delete(id);
  }
}

module.exports = new OrderService();
