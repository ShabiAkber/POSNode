const IRepository = require("./IRepository");
const OrderStatus = require("../models/OrderStatuses");

class OrderStatusesRepository extends IRepository {
  constructor() {
    super(OrderStatus);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await OrderStatus.findAll({ where: { OrderStatus_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branch"] });
    }
    return await OrderStatus.findAll({ where: { IsDeleted: false }, include: ["Branch"] });
  }

  async getById(id) {
    return await OrderStatus.findByPk(id, { include: ["Branch"] });
  }

  async create(data) {
    return await OrderStatus.create(data);
  }

  async update(id, data) {
    return await OrderStatus.update(data, { where: { OrdS_PK: id } });
  }

  async delete(id) {
    return await OrderStatus.update({ IsDeleted: true }, { where: { OrdS_PK: id } });
  }
}

module.exports = new OrderStatusesRepository();
