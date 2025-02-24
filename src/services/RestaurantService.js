const IService = require("./IService");
const restaurantRepository = require("../repositories/RestaurantRepository");

class RestaurantService extends IService {
  constructor() {
    super(restaurantRepository);
  }

  async getAll() {
    return await restaurantRepository.getAll();
  }

  async getById(id) {
    return await restaurantRepository.getById(id);
  }

  async create(data) {
    return await restaurantRepository.create(data);
  }

  async update(id, data) {
    return await restaurantRepository.update(id, data);
  }

  async delete(id) {
    return await restaurantRepository.delete(id);
  }
}

module.exports = new RestaurantService();
