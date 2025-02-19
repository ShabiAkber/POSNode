const VoucherCardDetail = require("../models/VoucherCardDetails");
const IRepository = require("./IRepository");

class VoucherCardDetailRepository extends IRepository {
  constructor() {
    super(VoucherCardDetail);
  }

  async getAll(query) {
    return await VoucherCardDetail.findAll({ where: { VchCrd_BranchFK: query.BranchId, IsDeleted: false } });
  }

  async getById(id) {
    return await VoucherCardDetail.findByPk(id);
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
