const IRepository = require("./IRepository");
const OrderStatus = require("../models/OrderStatuses");

class OrderStatusesRepository extends IRepository {
  constructor() {
    super(OrderStatus);
  }

  async getAll(query) {
    return await OrderStatus.findAll({ where: { OrderStatus_BranchFK: query.BranchId, IsDeleted: false } });
  }

  async getById(id) {
    return await OrderStatus.findByPk(id);
  }

  async create(data) {
    return await OrderStatus.create(data);
  }

  async update(id, data) {
    const orderStatus = await OrderStatus.findByPk(id);
    if (!orderStatus) return null;
    return await orderStatus.update(data);
  }

  async delete(id) {
    const orderStatus = await OrderStatus.findByPk(id);
    if (!orderStatus) return null;
    return await orderStatus.update({ IsDeleted: true });
  }
}

module.exports = new OrderStatusesRepository();
