const IService = require("./IService");
const VoucherCardDetailRepository = require("../repositories/VoucherCardDetailRepository");

class VoucherCardDetailService extends IService {
  async getAll() {
    return await VoucherCardDetailRepository.getAll();
  }

  async getById(id) {
    return await VoucherCardDetailRepository.getById(id);
  }

  async create(data) {
    return await VoucherCardDetailRepository.create(data);
  }

  async update(id, data) {
    return await VoucherCardDetailRepository.update(id, data);
  }

  async delete(id) {
    return await VoucherCardDetailRepository.delete(id);
  }
}

module.exports = new VoucherCardDetailService();
