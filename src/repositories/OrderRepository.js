const IRepository = require("./IRepository");
const Order = require("../models/Orders");

class OrderRepository extends IRepository {
  constructor() {
    super(Order);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await Order.findAll({ where: { Ord_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branch", "OrderDetail", "OrderType", "PaymentStatus", "PaymentType", "OrderStatus", "TableDineIn"] });
    }
    return await Order.findAll({ where: { IsDeleted: false }, include: ["Branch", "OrderDetail", "OrderType", "PaymentStatus", "PaymentType", "OrderStatus", "TableDineIn"] });
  }

  async getById(id) {
    return await Order.findByPk(id, { include: ["Branch", "OrderDetail", "OrderType", "PaymentStatus", "PaymentType", "OrderStatus", "TableDineIn"] });
  }

  async create(data) {
    return await Order.create(data);
  }

  async update(id, data) {
    return await Order.update(data, { where: { Ord_PK: id } });
  }

  async delete(id) {
    return await Order.update({ IsDeleted: true }, { where: { Ord_PK: id } });
  }
}

module.exports = new OrderRepository();
