const IRepository = require("./IRepository");
const OrderDetail = require("../models/OrderDetails");

class OrderDetailRepository extends IRepository {
  constructor() {
    super(OrderDetail);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await OrderDetail.findAll({ where: { OrderDetail_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches"] });
    }
    return await OrderDetail.findAll({ where: { IsDeleted: false }, include: ["Branches"] });
  }

  async getById(id) {
    return await OrderDetail.findByPk(id, { include: ["Branches"] });
  }

  async create(data) {
    try{
      const pk = await PKGenerator.generatePK('OrderDetails', 'OrdD_PK');
      return await OrderDetail.create({
        ...data,
        OrdD_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    return await OrderDetail.update(data, { where: { OrdD_PK: id } });
  }

  async delete(id) {
    return await OrderDetail.update({ IsDeleted: true }, { where: { OrdD_PK: id } });
  }
}

module.exports = new OrderDetailRepository();
