const IRepository = require("./IRepository");
const OrderType = require("../models/OrderTypes");

class OrderTypesRepository extends IRepository {
  constructor() {
    super(OrderType);
  }

  async getAll(query) {
    return await OrderType.findAll({ where: { OrderType_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branch"] });
  }

  async getById(id) {
    return await OrderType.findByPk(id, { include: ["Branch"] });
  }

  async create(data) {
    return await OrderType.create(data);
  }

  async update(id, data) {
    return await OrderType.update(data, { where: { OrdT_PK: id } });
  }

  async delete(id) {
    return await OrderType.update({ IsDeleted: true }, { where: { OrdT_PK: id } });
  }
}

module.exports = new OrderTypesRepository();
