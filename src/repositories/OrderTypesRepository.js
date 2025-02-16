const IRepository = require("./IRepository");
const OrderTypes = require("../models/OrderTypes");

class OrderTypesRepository extends IRepository {
  async getAll() {
    return await OrderTypes.findAll();
  }

  async getById(id) {
    return await OrderTypes.findByPk(id);
  }

  async create(data) {
    return await OrderTypes.create(data);
  }

  async update(id, data) {
    const orderType = await OrderTypes.findByPk(id);
    if (!orderType) return null;
    return await orderType.update(data);
  }

  async delete(id) {
    const orderType = await OrderTypes.findByPk(id);
    if (!orderType) return null;
    return await orderType.destroy();
  }
}

module.exports = new OrderTypesRepository();
