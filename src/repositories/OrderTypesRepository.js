const IRepository = require("./IRepository");
const OrderType = require("../models/OrderTypes");

class OrderTypesRepository extends IRepository {
  constructor() {
    super(OrderType);
  }

  async getAll() {
    return await OrderType.findAll();
  }

  async getById(id) {
    return await OrderType.findByPk(id);
  }

  async create(data) {
    return await OrderType.create(data);
  }

  async update(id, data) {
    const orderType = await OrderType.findByPk(id);
    if (!orderType) return null;
    return await orderType.update(data);
  }

  async delete(id) {
    const orderType = await OrderType.findByPk(id);
    if (!orderType) return null;
    return await orderType.update({ IsDeleted: true });
  }
}

module.exports = new OrderTypesRepository();
