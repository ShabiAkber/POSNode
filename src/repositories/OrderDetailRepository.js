const IRepository = require("./IRepository");
const OrderDetail = require("../models/OrderDetails");

class OrderDetailRepository extends IRepository {
  async findAll() {
    return await OrderDetail.findAll();
  }

  async findById(id) {
    return await OrderDetail.findByPk(id);
  }

  async create(data) {
    return await OrderDetail.create(data);
  }

  async update(id, data) {
    const orderDetail = await this.findById(id);
    if (!orderDetail) return null;
    return await orderDetail.update(data);
  }

  async delete(id) {
    const orderDetail = await this.findById(id);
    if (!orderDetail) return null;
    return await orderDetail.destroy();
  }
}

module.exports = new OrderDetailRepository();
