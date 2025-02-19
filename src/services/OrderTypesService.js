const IService = require("./IService");
const orderTypesRepository = require("../repositories/OrderTypesRepository");

class OrderTypesService extends IService {
  constructor() {
    super(orderTypesRepository);
  }

  async getAll(query) {
    return await orderTypesRepository.getAll(query);
  }

  async getById(id) {
    return await orderTypesRepository.getById(id);
  }

  async create(data) {
    return await orderTypesRepository.create(data);
  }

  async update(id, data) {
    return await orderTypesRepository.update(id, data);
  }

  async delete(id) {
    return await orderTypesRepository.delete(id);
  }
}

module.exports = new OrderTypesService();
