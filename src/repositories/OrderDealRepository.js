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
    if (query.BranchId) {
      return await OrderDeal.findAll({ where: { OrderDeal_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches"] });
    }
    return await OrderDeal.findAll({ where: { IsDeleted: false }, include: ["Branches"] });
  }

  async getById(id) {
    return await OrderDeal.findByPk(id, { include: ["Branches"] });
  }

  async create(data) {
    try{
      const pk = await PKGenerator.generatePK('OrderDeals', 'OrderDeal_PK');
      return await OrderDeal.create({
        ...data,
        OrderDeal_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    return await OrderDeal.update(data, { where: { OrderDeal_PK: id } });
  }

  async delete(id) {
    return await OrderDeal.update({ IsDeleted: true }, { where: { OrderDeal_PK: id } });
  }

  // ✅ Custom method to fetch details along with relationships
  async getAllWithDetails(query) {
    if (query.BranchId) {
      return await OrderDeal.findAll({
        where: { OrderDeal_BranchFK: query.BranchId, IsDeleted: false },
        include: [ 'OrderDealProduct', 'OrderDealCategory', 'Branch' ],
      });
    }
    return await OrderDeal.findAll({
      where: { IsDeleted: false },
      include: [ 'OrderDealProduct', 'OrderDealCategory', 'Branch' ],
    });
  }

  async getByIdWithDetails(id) {
    return await OrderDeal.findByPk(id, {
      where: { IsDeleted: false },
      include: [ 'OrderDealProduct', 'OrderDealCategory', 'Branch' ],
    });
  }
}

module.exports = new OrderDealRepository();
