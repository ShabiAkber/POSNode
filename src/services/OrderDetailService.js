const IService = require("./IService");
const orderDetailRepository = require("../repositories/OrderDetailRepository");

class OrderDetailService extends IService {
  constructor() {
    super(orderDetailRepository);
  }

  async getAll(query) {
    return await orderDetailRepository.getAll(query);
  }

  async getById(id) {
    return await orderDetailRepository.getById(id);
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
