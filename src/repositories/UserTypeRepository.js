const IRepository = require("./IRepository");
const UserType = require("../models/UserTypes");

class UserTypeRepository extends IRepository {
  constructor() {
    super(UserType);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await UserType.findAll({ where: { UsrT_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branch"] });
    }
    return await UserType.findAll({ where: { IsDeleted: false }, include: ["Branch"] });
  }

  async getById(id) {
    return await UserType.findByPk(id, { include: ["Branch"] });
  }

  async create(data) {
    return await UserType.create(data);
  }

  async update(id, data) {
    return await UserType.update(data, { where: { UsrT_PK: id } });
  }

  async delete(id) {
    return await UserType.update({ IsDeleted: true }, { where: { UsrT_PK: id } });
  }
}

module.exports = new UserTypeRepository();
