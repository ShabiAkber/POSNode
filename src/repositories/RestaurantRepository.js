const IRepository = require("./IRepository");
const Restaurant = require("../models/Restaurants");
const PKGenerator = require("../utils/pkGenerator");

class RestaurantRepository extends IRepository {
  constructor() {
    super(Restaurant);
  }

  async getAll() {
    return await Restaurant.findAll({
      where: {
        IsDeleted: false
      }
    });
  }

  async getById(id) {
    return await Restaurant.findOne({
      where: {
        Res_PK: id,
        IsDeleted: false
      }
    });
  }

  async create(data) {
    try {
      const pk = await PKGenerator.generatePK('Restaurants', 'Res_PK');
      return await Restaurant.create({
        ...data,
        Res_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    return await Restaurant.update(data, { where: { Res_PK: id } });
  }

  async delete(id) {
    return await Restaurant.update({ IsDeleted: true }, { where: { Res_PK: id } });
  }
}

module.exports = new RestaurantRepository();
