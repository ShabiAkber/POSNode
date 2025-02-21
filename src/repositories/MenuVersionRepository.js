const IRepository = require("./IRepository");
const MenuVersion = require("../models/MenuVersions");

class MenuVersionRepository extends IRepository {
  constructor() {
    super(MenuVersion);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await MenuVersion.findAll({ where: { MenuVer_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches"] });
    }
    return await MenuVersion.findAll({ where: { IsDeleted: false }, include: ["Branches"] });
  }

  async getById(id) {
    return await MenuVersion.findOne({ where: { MenuVer_PK: id, IsDeleted: false }, include: ["Branches"] });
  }

  async create(data) {
    return await MenuVersion.create(data);
  }

  async update(id, data) {
    return await MenuVersion.update(data, { where: { MenuVer_PK: id } });
  }

  async delete(id) {
    return await MenuVersion.update({ IsDeleted: true }, { where: { MenuVer_PK: id } });
  }
}

module.exports = new MenuVersionRepository();
