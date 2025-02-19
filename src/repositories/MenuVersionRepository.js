const IRepository = require("./IRepository");
const MenuVersion = require("../models/MenuVersions");

class MenuVersionRepository extends IRepository {
  constructor() {
    super(MenuVersion);
  }

  async getAll(query) {
    return await MenuVersion.findAll({ where: { MenuVer_BranchFK: query.BranchId, IsDeleted: false } });
  }

  async getById(id) {
    return await MenuVersion.findOne({ where: { MenuVer_PK: id, IsDeleted: false } });
  }

  async create(data) {
    return await MenuVersion.create(data);
  }

  async update(id, data) {
    const menuVersion = await MenuVersion.findByPk(id);
    if (!menuVersion) return null;
    return await menuVersion.update(data);
  }

  async delete(id) {
    const menuVersion = await MenuVersion.findByPk(id);
    if (!menuVersion) return null;
    return await menuVersion.update({ IsDeleted: true });
  }
}

module.exports = new MenuVersionRepository();
