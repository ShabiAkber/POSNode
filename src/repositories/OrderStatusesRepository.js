const IRepository = require("./IRepository");
const OrderStatus = require("../models/OrderStatuses");

class OrderStatusesRepository extends IRepository {
  constructor() {
    super(OrderStatus);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await OrderStatus.findAll({ where: { OrderStatus_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches"] });
    }
    return await OrderStatus.findAll({ where: { IsDeleted: false }, include: ["Branches"] });
  }

  async getById(id) {
    return await OrderStatus.findByPk(id, { include: ["Branches"] });
  }

  async create(data) {
    try{
      const pk = await PKGenerator.generatePK('OrderStatuses', 'OrdS_PK');
      return await OrderStatus.create({
        ...data,
        OrdS_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    return await OrderStatus.update(data, { where: { OrdS_PK: id } });
  }

  async delete(id) {
    return await OrderStatus.update({ IsDeleted: true }, { where: { OrdS_PK: id } });
  }
}

module.exports = new OrderStatusesRepository();
