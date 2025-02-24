const IRepository = require("./IRepository");
const OrderType = require("../models/OrderTypes");

class OrderTypesRepository extends IRepository {
  constructor() {
    super(OrderType);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await OrderType.findAll({ where: { OrderType_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches"] });
    }
    return await OrderType.findAll({ where: { IsDeleted: false }, include: ["Branches"] });
  }

  async getById(id) {
    return await OrderType.findByPk(id, { include: ["Branches"] });
  }

  async create(data) {
    try{
      const pk = await PKGenerator.generatePK('OrderTypes', 'OrdT_PK');
      return await OrderType.create({
        ...data,
        OrdT_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    return await OrderType.update(data, { where: { OrdT_PK: id } });
  }

  async delete(id) {
    return await OrderType.update({ IsDeleted: true }, { where: { OrdT_PK: id } });
  }
}

module.exports = new OrderTypesRepository();
