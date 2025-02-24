const GiftCardDetail = require("../models/GiftCardDetails");
const IRepository = require("./IRepository");

const OrderDetail = require("../models/OrderDetails");

class GiftCardDetailRepository extends IRepository {
  constructor() {
    super(GiftCardDetail);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await GiftCardDetail.findAll({ where: { GiftCardDetail_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches"] });
    }
    return await GiftCardDetail.findAll({ where: { IsDeleted: false }, include: ["Branches"] });
  }

  async getById(id) {
    return await GiftCardDetail.findOne({ where: { GiftCardDetail_PK: id, IsDeleted: false }, include: ["Branches"] });
  }

  async create(data) {
    try{
      const pk = await PKGenerator.generatePK('GiftCardDetails', 'GiftCardDetail_PK');
      return await GiftCardDetail.create({
        ...data,
        GiftCardDetail_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    return await GiftCardDetail.update(data, { where: { GiftCardDetail_PK: id } });
  }

  async delete(id) {
    return await GiftCardDetail.update({ IsDeleted: true }, { where: { GiftCardDetail_PK: id } });
  }
}

module.exports = new GiftCardDetailRepository();
