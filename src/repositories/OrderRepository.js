const IRepository = require("./IRepository");
const Order = require("../models/Orders");

class OrderRepository extends IRepository {
  constructor() {
    super(Order);
  }

  async getAll(query) {
    return await Order.findAll({ where: { Order_BranchFK: query.BranchId, IsDeleted: false } });
  }

  async getById(id) {
    return await Order.findByPk(id);
  }

  async create(data) {
    return await Order.create(data);
  }

  async update(id, data) {
    const order = await Order.findByPk(id);
    if (!order) return null;
    return await order.update(data);
  }

  async delete(id) {
    const order = await Order.findByPk(id);
    if (!order) return null;
    return await order.update({ IsDeleted: true });
  }
}

module.exports = new OrderRepository();
