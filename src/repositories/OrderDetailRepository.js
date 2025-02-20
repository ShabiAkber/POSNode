const IRepository = require("./IRepository");
const OrderDetail = require("../models/OrderDetails");

class OrderDetailRepository extends IRepository {
  constructor() {
    super(OrderDetail);
  }

  async getAll(query) {
    return await OrderDetail.findAll({ where: { OrderDetail_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branch"] });
  }

  async getById(id) {
    return await OrderDetail.findByPk(id, { include: ["Branch"] });
  }

  async create(data) {
    return await OrderDetail.create(data);
  }

  async update(id, data) {
    return await OrderDetail.update(data, { where: { OrdD_PK: id } });
  }

  async delete(id) {
    return await OrderDetail.update({ IsDeleted: true }, { where: { OrdD_PK: id } });
  }
}

module.exports = new OrderDetailRepository();
