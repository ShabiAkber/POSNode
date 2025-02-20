const IRepository = require("./IRepository");
const KitchenOrder = require("../models/KitchenOrders");

class KitchenOrderRepository extends IRepository {
  constructor() {
    super(KitchenOrder);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await KitchenOrder.findAll({ where: { KitOrd_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branch", "Order", "KitchenSection"] });
    }
    return await KitchenOrder.findAll({ where: { IsDeleted: false }, include: ["Branch", "Order", "KitchenSection"] });
  }

  async getById(id) {
    return await KitchenOrder.findByPk(id, { include: ["Branch", "Order", "KitchenSection"] });
  }

  async create(data) {
    return await KitchenOrder.create(data);
  }

  async update(id, data) {
    return await KitchenOrder.update(data, { where: { KitOrd_PK: id } });
  }

  async delete(id) {
    return await KitchenOrder.update({ IsDeleted: true }, { where: { KitOrd_PK: id } });
  }
}

module.exports = new KitchenOrderRepository();
