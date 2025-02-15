const IService = require("./IService");
const GiftCardDetailRepository = require("../repositories/GiftCardDetailRepository");

class GiftCardDetailService extends IService {
  async getAll() {
    return await GiftCardDetailRepository.getAll();
  }

  async getById(id) {
    return await GiftCardDetailRepository.getById(id);
  }

  async create(data) {
    return await GiftCardDetailRepository.create(data);
  }

  async update(id, data) {
    return await GiftCardDetailRepository.update(id, data);
  }

  async delete(id) {
    return await GiftCardDetailRepository.delete(id);
  }
}

module.exports = new GiftCardDetailService();
