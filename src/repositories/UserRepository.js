const IRepository = require("./IRepository");
const UserDetail = require("../models/UserDetails");

class UserRepository extends IRepository {
  constructor() {
    super(UserDetail);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await UserDetail.findAll({ where: { Usr_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branch"] });
    }
    return await UserDetail.findAll({ where: { IsDeleted: false }, include: ["Branch"] });
  }

  async getById(id) {
    return await UserDetail.findByPk(id, { include: ["Branch"] });
  }

  async findByEmail(email) {
    return await UserDetail.findOne({ where: { Usr_Email: email, IsDeleted: false } });
  }

  async create(data) {
    return await UserDetail.create(data);
  }

  async update(id, data) {
    return await UserDetail.update(data, { where: { Usr_PK: id } });
  }

  async delete(id) {
    return await UserDetail.update({ IsDeleted: true }, { where: { Usr_PK: id } });
  }
}

module.exports = new UserRepository();
