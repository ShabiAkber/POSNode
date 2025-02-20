const IRepository = require("./IRepository");
const MenuGroup = require("../models/MenuGroups");

class MenuGroupRepository extends IRepository {
  constructor() {
    super(MenuGroup);
  }

  async getAll(query) {
    return await MenuGroup.findAll({ where: { MenuGrp_MenuVerFK: query.MenuVerId, MenuGrp_BranchFK: query.BranchId, IsDeleted: false }, include: ["MenuVersion", "Branch"] });
  }

  async getById(id) {
    return await MenuGroup.findOne({ where: { MenuGrp_PK: id, IsDeleted: false }, include: ["MenuVersion", "Branch"] });
  }

  async create(data) {
    return await MenuGroup.create(data);
  }

  async update(id, data) {
    return await MenuGroup.update(data, { where: { MenuGrp_PK: id } });
  }

  async delete(id) {
    return await MenuGroup.update({ IsDeleted: true }, { where: { MenuGrp_PK: id } });
  }
}

module.exports = new MenuGroupRepository();
