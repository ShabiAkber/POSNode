const IRepository = require("./IRepository");
const UserType = require("../models/UserTypes");

class UserTypeRepository extends IRepository {
  constructor() {
    super(UserType);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await UserType.findAll({ where: { UsrT_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches"] });
    }
    return await UserType.findAll({ where: { IsDeleted: false }, include: ["Branches"] });
  }

  async getById(id) {
    return await UserType.findByPk(id, { include: ["Branches"] });
  }

  async create(data) {
    try{
      const pk = await PKGenerator.generatePK('UserTypes', 'UsrT_PK');
      return await UserType.create({
        ...data,
        UsrT_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }
  
  async update(id, data) {
    return await UserType.update(data, { where: { UsrT_PK: id } });
  }

  async delete(id) {
    return await UserType.update({ IsDeleted: true }, { where: { UsrT_PK: id } });
  }
}

module.exports = new UserTypeRepository();
