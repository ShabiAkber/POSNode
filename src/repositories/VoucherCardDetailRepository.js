const VoucherCardDetail = require("../models/VoucherCardDetails");
const IRepository = require("./IRepository");

class VoucherCardDetailRepository extends IRepository {
  constructor() {
    super(VoucherCardDetail);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await VoucherCardDetail.findAll({ where: { VchCrd_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches"] });
    }
    return await VoucherCardDetail.findAll({ where: { IsDeleted: false }, include: ["Branches"] });
  }

  async getById(id) {
    return await VoucherCardDetail.findByPk(id, { include: ["Branches"] });
  }

  async create(data) {
    try{
      const pk = await PKGenerator.generatePK('VoucherCardDetails', 'VchCrd_PK');
      return await VoucherCardDetail.create({
        ...data,
        VchCrd_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }
  
  async update(id, data) {
    return await VoucherCardDetail.update(data, { where: { VchCrd_PK: id } });
  }

  async delete(id) {
    return await VoucherCardDetail.update({ IsDeleted: true }, { where: { VchCrd_PK: id } });
  }
}

module.exports = new VoucherCardDetailRepository();
