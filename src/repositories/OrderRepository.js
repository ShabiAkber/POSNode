const IRepository = require("./IRepository");
const Order = require("../models/Orders");

class OrderRepository extends IRepository {
  constructor() {
    super(Order);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await Order.findAll({ where: { Ord_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches", "OrderDetails", "OrderTypes", "PaymentStatus", "PaymentTypes", "OrderStatus", "TableDineIns"] });
    }
    return await Order.findAll({ where: { IsDeleted: false }, include: ["Branches", "OrderDetails", "OrderTypes", "PaymentStatus", "PaymentTypes", "OrderStatus", "TableDineIns"] });
  }

  async getById(id) {
    return await Order.findByPk(id, { include: ["Branches", "OrderDetails", "OrderTypes", "PaymentStatus", "PaymentTypes", "OrderStatus", "TableDineIns"] });
  }

  async create(data) {
    try{
      const pk = await PKGenerator.generatePK('Orders', 'Ord_PK');
      return await Order.create({
        ...data,
        Ord_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    return await Order.update(data, { where: { Ord_PK: id } });
  }

  async delete(id) {
    return await Order.update({ IsDeleted: true }, { where: { Ord_PK: id } });
  }
}

module.exports = new OrderRepository();
