const IRepository = require("./IRepository");
const UserType = require("../models/UserTypes");

class UserTypeRepository extends IRepository {
  constructor() {
    super(UserType);
  }

  async getAll(query) {
    return await UserType.findAll({ where: { UsrT_BranchFK: query.BranchId, IsDeleted: false } });
  }

  async getById(id) {
    return await UserType.findByPk(id);
  }

  async create(data) {
    return await UserType.create(data);
  }

  async update(id, data) {
    const userType = await UserType.findByPk(id);
    if (!userType) return null;
    await userType.update(data);
    return userType;
  }

  async delete(id) {
    const userType = await UserType.findByPk(id);
    if (!userType) return null;
    return await userType.update({ IsDeleted: true });
  }
}

module.exports = new UserTypeRepository();
