const IRepository = require("./IRepository");
const UserRole = require("../models/UserRoles");

class UserRoleRepository extends IRepository {
  constructor() {
    super(UserRole);
  }

  async getAll(query) {
    return await UserRole.findAll({ where: { UR_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branch", "User", "Role"] });
  }

  async getById(id) {
    return await UserRole.findByPk(id, { include: ["Branch", "User", "Role"] });
  }

  async create(data) {
    return await UserRole.create(data);
  }

  async update(id, data) {
    return await UserRole.update(data, { where: { UR_PK: id } });
  }

  async delete(id) {
    return await UserRole.update({ IsDeleted: true }, { where: { UR_PK: id } });
  }
}

module.exports = new UserRoleRepository();
