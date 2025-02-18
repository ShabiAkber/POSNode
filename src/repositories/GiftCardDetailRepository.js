const GiftCardDetail = require("../models/GiftCardDetails");
const IRepository = require("./IRepository");

const OrderDetail = require("../models/OrderDetails");

class GiftCardDetailRepository extends IRepository {
  constructor() {
    super(GiftCardDetail);
  }

  async getAll() {
    return await GiftCardDetail.findAll({ where: { IsDeleted: false } });
  }

  async getById(id) {
    return await GiftCardDetail.findByPk(id);
  }

  async create(data) {
    return await GiftCardDetail.create(data);
  }

  async update(id, data) {
    const giftCard = await GiftCardDetail.findByPk(id);
    if (!giftCard) return null;
    return await giftCard.update(data);
  }

  async delete(id) {
    const giftCard = await GiftCardDetail.findByPk(id);
    if (!giftCard) return null;
    return await giftCard.update({ IsDeleted: true });
  }
}

module.exports = new GiftCardDetailRepository();
