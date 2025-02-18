const IRepository = require("./IRepository");
const OrderDetail = require("../models/OrderDetails");

class OrderDetailRepository extends IRepository {
  constructor() {
    super(OrderDetail);
  }

  async getAll(query) {
    return await OrderDetail.findAll({ where: { OrderDetail_BranchFK: query.BranchId, IsDeleted: false } });
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
    return await orderDetail.update({ IsDeleted: true });
  }
}

module.exports = new OrderDetailRepository();
