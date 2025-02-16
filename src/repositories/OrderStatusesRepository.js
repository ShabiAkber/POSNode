const IRepository = require("./IRepository");
const OrderStatuses = require("../models/OrderStatuses");

class OrderStatusesRepository extends IRepository {
  async getAll() {
    return await OrderStatuses.findAll();
  }

  async getById(id) {
    return await OrderStatuses.findByPk(id);
  }

  async create(data) {
    return await OrderStatuses.create(data);
  }

  async update(id, data) {
    const orderStatus = await OrderStatuses.findByPk(id);
    if (!orderStatus) return null;
    return await orderStatus.update(data);
  }

  async delete(id) {
    const orderStatus = await OrderStatuses.findByPk(id);
    if (!orderStatus) return null;
    return await orderStatus.destroy();
  }
}

module.exports = new OrderStatusesRepository();
