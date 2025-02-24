const IRepository = require("./IRepository");
const PaymentStatus = require("../models/PaymentStatuses");

class PaymentStatusesRepository extends IRepository {
  constructor() {
    super(PaymentStatus);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await PaymentStatus.findAll({ where: { PayS_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches"] });
    }
    return await PaymentStatus.findAll({ where: { IsDeleted: false }, include: ["Branches"] });
  }

  async getById(id) {
    return await PaymentStatus.findByPk(id, { include: ["Branches"] });
  }

  async create(data) {
    try{
      const pk = await PKGenerator.generatePK('PaymentStatuses', 'PayS_PK');
      return await PaymentStatus.create({
        ...data,
        PayS_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }
  
  async update(id, data) {
    return await PaymentStatus.update(data, { where: { PayS_PK: id } });
  }

  async delete(id) {
    return await PaymentStatus.update({ IsDeleted: true }, { where: { PayS_PK: id } });
  }
}

module.exports = new PaymentStatusesRepository();
