const GiftCardDetail = require("../models/GiftCardDetails");
const OrderDetail = require("../models/OrderDetails");
const IRepository = require("./IRepository");

class GiftCardDetailRepository extends IRepository {
  async getAll() {
    return await GiftCardDetail.findAll({
      where: { IsDeleted: false },
      include: [{ model: OrderDetail, as: "OrderDetails" }],
    });
  }

  async getById(id) {
    return await GiftCardDetail.findByPk(id, {
      include: [{ model: OrderDetail, as: "OrderDetails" }],
    });
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
