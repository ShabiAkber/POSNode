const IRepository = require("./IRepository");
const MenuGroup = require("../models/MenuGroups");

class MenuGroupRepository extends IRepository {
  constructor() {
    super(MenuGroup);
  }

  async getAll(query) {
    return await MenuGroup.findAll({ where: { MenuGrp_MenuVerFK: query.MenuVerId, MenuGrp_BranchFK: query.BranchId, IsDeleted: false } });
  }

  async getById(id) {
    return await MenuGroup.findOne({ where: { MenuGrp_PK: id, IsDeleted: false } });
  }

  async create(data) {
    return await MenuGroup.create(data);
  }

  async update(id, data) {
    const menuGroup = await MenuGroup.findByPk(id);
    if (!menuGroup) return null;
    return await menuGroup.update(data);
  }

  async delete(id) {
    const menuGroup = await MenuGroup.findByPk(id);
    if (!menuGroup) return null;
    return await menuGroup.update({ IsDeleted: true });
  }
}

module.exports = new MenuGroupRepository();
