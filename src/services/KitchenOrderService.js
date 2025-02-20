const IService = require("./IService");
const KitchenOrderRepository = require("../repositories/KitchenOrderRepository");

class KitchenOrderService extends IService {
  constructor() {
    super(KitchenOrderRepository);
  }

  async getAll(query) {
    return await KitchenOrderRepository.getAll(query);
  }

  async getById(id) {
    return await KitchenOrderRepository.getById(id);
  }

  async create(data) {
    return await KitchenOrderRepository.create(data);
  }

  async update(id, data) {
    return await KitchenOrderRepository.update(id, data);
  }

  async delete(id) {
    return await KitchenOrderRepository.delete(id);
  }
}

module.exports = new KitchenOrderService();
