const IRepository = require("./IRepository");
const Order = require("../models/Orders");

class OrderRepository extends IRepository {
  async findAll() {
    return await Order.findAll();
  }

  async findById(id) {
    return await Order.findByPk(id);
  }

  async create(data) {
    return await Order.create(data);
  }

  async update(id, data) {
    const order = await this.findById(id);
    if (!order) return null;
    return await order.update(data);
  }

  async delete(id) {
    const order = await this.findById(id);
    if (!order) return null;
    return await order.destroy();
  }
}

module.exports = new OrderRepository();
