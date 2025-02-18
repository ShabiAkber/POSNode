const IService = require("./IService");
const orderDealRepository = require("../repositories/OrderDealRepository");

class OrderDealService extends IService {
  constructor() {
    super(orderDealRepository);
  }

  // ✅ Implementing all methods from IService
  async getAll(query) {
    return await orderDealRepository.getAll(query);
  }

  async getById(id) {
    return await orderDealRepository.getById(id);
  }

  async create(data) {
    return await orderDealRepository.create(data);
  }

  async update(id, data) {
    return await orderDealRepository.update(id, data);
  }

  async delete(id) {
    return await orderDealRepository.delete(id);
  }

  // ✅ Custom Service Methods (if required)
  async getAllWithDetails() {
    return await orderDealRepository.getAllWithDetails();
  }

  async getByIdWithDetails(id) {
    return await orderDealRepository.getByIdWithDetails(id);
  }
}

module.exports = new OrderDealService();
