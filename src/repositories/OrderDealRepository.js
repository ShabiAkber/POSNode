const IRepository = require("./IRepository");
const { OrderDeal } = require("../models/OrderDeals");
const { OrderDealProduct } = require("../models/OrderDealProducts");
const { OrderDealCategory } = require("../models/OrderDealCategories");

class OrderDealRepository extends IRepository {
  constructor() {
    super(OrderDeal);
  }

  // Implement all required methods from IRepository
  async getAll(query) {
    return await OrderDeal.findAll({ where: { OrderDeal_BranchFK: query.BranchId, IsDeleted: false } });
  }

  async getById(id) {
    return await OrderDeal.findByPk(id);
  }

  async create(data) {
    return await OrderDeal.create(data);
  }

  async update(id, data) {
    const deal = await OrderDeal.findByPk(id);
    if (!deal) return null;
    return await deal.update(data);
  }

  async delete(id) {
    const deal = await OrderDeal.findByPk(id);
    if (!deal) return null;
    return await deal.update({ IsDeleted: true });
  }

  // ✅ Custom method to fetch details along with relationships
  async getAllWithDetails(query) {
    return await OrderDeal.findAll({
      where: { OrderDeal_BranchFK: query.BranchId, IsDeleted: false },
      include: [
        { model: OrderDealProduct, as: "Products" },
        { model: OrderDealCategory, as: "Categories" },
      ],
    });
  }

  async getByIdWithDetails(id) {
    return await OrderDeal.findByPk(id, {
      where: { OrderDeal_BranchFK: query.BranchId, IsDeleted: false },
      include: [
        { model: OrderDealProduct, as: "Products" },
        { model: OrderDealCategory, as: "Categories" },
      ],
    });
  }
}

module.exports = new OrderDealRepository();
