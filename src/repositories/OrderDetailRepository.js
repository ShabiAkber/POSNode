const IRepository = require("./IRepository");
const OrderDetail = require("../models/OrderDetails");

class OrderDetailRepository extends IRepository {
  async getAll() {
    return await OrderDetail.findAll();
  }

  async getById(id) {
    return await OrderDetail.findByPk(id);
  }

  async create(data) {
    return await OrderDetail.create(data);
  }

  async update(id, data) {
    const orderDetail = await OrderDetail.findByPk(id);
    if (!orderDetail) return null;
    return await orderDetail.update(data);
  }

  async delete(id) {
    const orderDetail = await OrderDetail.findByPk(id);
    if (!orderDetail) return null;
    return await orderDetail.destroy();
  }
}

module.exports = new OrderDetailRepository();
