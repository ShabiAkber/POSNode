const IRepository = require("./IRepository");
const PaymentStatus = require("../models/PaymentStatuses");

class PaymentStatusesRepository extends IRepository {
  constructor() {
    super(PaymentStatus);
  }

  async getAll(query) {
    return await PaymentStatus.findAll({ where: { PayS_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branch"] });
  }

  async getById(id) {
    return await PaymentStatus.findByPk(id, { include: ["Branch"] });
  }

  async create(data) {
    return await PaymentStatus.create(data);
  }

  async update(id, data) {
    return await PaymentStatus.update(data, { where: { PayS_PK: id } });
  }

  async delete(id) {
    return await PaymentStatus.update({ IsDeleted: true }, { where: { PayS_PK: id } });
  }
}

module.exports = new PaymentStatusesRepository();
