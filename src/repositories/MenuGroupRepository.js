const IRepository = require("./IRepository");
const MenuGroup = require("../models/MenuGroups");

class MenuGroupRepository extends IRepository {
  async getAll() {
    return await MenuGroup.findAll({ where: { IsDeleted: false } });
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
