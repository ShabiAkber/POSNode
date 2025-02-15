const IService = require("../interfaces/IService");
const orderDetailRepository = require("../repositories/OrderDetailRepository");

class OrderDetailService extends IService {
  async getAll() {
    return await orderDetailRepository.findAll();
  }

  async getById(id) {
    return await orderDetailRepository.findById(id);
  }

  async create(data) {
    return await orderDetailRepository.create(data);
  }

  async update(id, data) {
    return await orderDetailRepository.update(id, data);
  }

  async delete(id) {
    return await orderDetailRepository.delete(id);
  }
}

module.exports = new OrderDetailService();
