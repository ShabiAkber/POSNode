const IRepository = require("./IRepository");
const KitchenOrder = require("../models/KitchenOrders");

class KitchenOrderRepository extends IRepository {
  constructor() {
    super(KitchenOrder);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await KitchenOrder.findAll({ where: { KitOrd_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches", "Orders", "KitchenSections"] });
    }
    return await KitchenOrder.findAll({ where: { IsDeleted: false }, include: ["Branches", "Orders", "KitchenSections"] });
  }

  async getById(id) {
    return await KitchenOrder.findByPk(id, { include: ["Branches", "Orders", "KitchenSections"] });
  }

    async create(data) {
    try{
      const pk = await PKGenerator.generatePK('KitchenOrders', 'KitOrd_PK');
      return await KitchenOrder.create({
        ...data,
        KitOrd_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    return await KitchenOrder.update(data, { where: { KitOrd_PK: id } });
  }

  async delete(id) {
    return await KitchenOrder.update({ IsDeleted: true }, { where: { KitOrd_PK: id } });
  }
}

module.exports = new KitchenOrderRepository();
