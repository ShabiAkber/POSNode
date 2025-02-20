const GiftCardDetail = require("../models/GiftCardDetails");
const IRepository = require("./IRepository");

const OrderDetail = require("../models/OrderDetails");

class GiftCardDetailRepository extends IRepository {
  constructor() {
    super(GiftCardDetail);
  }

  async getAll(query) {
    return await GiftCardDetail.findAll({ where: { GiftCardDetail_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branch"] });
  }

  async getById(id) {
    return await GiftCardDetail.findOne({ where: { GiftCardDetail_PK: id, IsDeleted: false }, include: ["Branch"] });
  }

  async create(data) {
    return await GiftCardDetail.create(data);
  }

  async update(id, data) {
    return await GiftCardDetail.update(data, { where: { GiftCardDetail_PK: id } });
  }

  async delete(id) {
    return await GiftCardDetail.update({ IsDeleted: true }, { where: { GiftCardDetail_PK: id } });
  }
}

module.exports = new GiftCardDetailRepository();
