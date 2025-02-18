const IRepository = require("./IRepository");
const UserDetail = require("../models/UserDetails");

class UserRepository extends IRepository {
  constructor() {
    super(UserDetail);
  }

  async getAll() {
    return await UserDetail.findAll();
  }

  async getById(id) {
    return await UserDetail.findByPk(id);
  }

  async create(data) {
    return await UserDetail.create(data);
  }

  async update(id, data) {
    const user = await UserDetail.findByPk(id);
    if (!user) return null;
    return await user.update(data);
  }

  async delete(id) {
    const user = await UserDetail.findByPk(id);
    if (!user) return null;
    return await user.update({ IsDeleted: true });
  }
}

module.exports = new UserRepository();
