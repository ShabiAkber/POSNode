const VoucherCardDetail = require("../models/VoucherCardDetail");
const OrderDetail = require("../models/OrderDetails");
const IRepository = require("./IRepository");

class VoucherCardDetailRepository extends IRepository {
  async getAll() {
    return await VoucherCardDetail.findAll({
      where: { IsDeleted: false },
      include: [{ model: OrderDetail, as: "OrderDetails" }],
    });
  }

  async getById(id) {
    return await VoucherCardDetail.findByPk(id, {
      include: [{ model: OrderDetail, as: "OrderDetails" }],
    });
  }

  async create(data) {
    return await VoucherCardDetail.create(data);
  }

  async update(id, data) {
    const voucherCard = await VoucherCardDetail.findByPk(id);
    if (!voucherCard) return null;
    return await voucherCard.update(data);
  }

  async delete(id) {
    const voucherCard = await VoucherCardDetail.findByPk(id);
    if (!voucherCard) return null;
    return await voucherCard.update({ IsDeleted: true });
  }
}

module.exports = new VoucherCardDetailRepository();
