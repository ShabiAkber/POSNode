const IRepository = require("./IRepository");
const OrderTypes = require("../models/OrderTypes");

class OrderTypesRepository extends IRepository {
  async findAll() {
    return await OrderTypes.findAll();
  }

  async findById(id) {
    return await OrderTypes.findByPk(id);
  }

  async create(data) {
    return await OrderTypes.create(data);
  }

  async update(id, data) {
    const orderType = await this.findById(id);
    if (!orderType) return null;
    return await orderType.update(data);
  }

  async delete(id) {
    const orderType = await this.findById(id);
    if (!orderType) return null;
    return await orderType.destroy();
  }
}

module.exports = new OrderTypesRepository();
