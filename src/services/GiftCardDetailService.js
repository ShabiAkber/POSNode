const IService = require("./IService");
const GiftCardDetailRepository = require("../repositories/GiftCardDetailRepository");

class GiftCardDetailService extends IService {
  constructor() {
    super(GiftCardDetailRepository);
  }

  async getAll(query) {
    return await GiftCardDetailRepository.getAll(query);
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
