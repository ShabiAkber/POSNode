const IRepository = require("./IRepository");
const { MenuGroup } = require("../models/MenuGroups");
const PKGenerator = require("../utils/pkGenerator");

class MenuGroupRepository extends IRepository {
  constructor() {
    super(MenuGroup);
  }

  async createMultiple(menuGroupData) {
    try {
      const { menuVersionPKs, groupData } = menuGroupData;
      const createdGroups = [];

      // Create menu group for each version PK
      for (const versionPK of menuVersionPKs) {
        const pk = await PKGenerator.generatePK('MenuGroups', 'MenuGrp_PK');

        const menuGroup = await MenuGroup.create({
          MenuGrp_PK: pk,
          MenuGrp_Name: groupData.MenuGrp_Name,
          MenuGrp_MenuVerFK: versionPK,
          MenuGrp_BranchFK: groupData.MenuGrp_BranchFK,
          IsDeleted: false
        });

        createdGroups.push(menuGroup);
      }

      return createdGroups;
    } catch (error) {
      console.error("Error creating menu groups:", error);
      throw error;
    }
  }

  async getAll() {
    if (query.BranchId) {
      return await MenuGroup.findAll({
        where: {
          MenuGrp_BranchFK: query.BranchId,
          IsDeleted: false
        },
        include: ["MenuVersions", "Branches"]
      });
    }
    return await MenuGroup.findAll({
      where: {
        IsDeleted: false
      },
      include: ["MenuVersions", "Branches"]
    });
  }

  async getById(id) {
    return await MenuGroup.findOne({
      where: {
        MenuGrp_PK: id,
        IsDeleted: false
      },
      include: ["MenuVersions", "Branches"]
    });
  }

  async update(id, data) {
    return await MenuGroup.update(data, { where: { MenuGrp_PK: id } });
  }

  async delete(id) {
    return await MenuGroup.update({ IsDeleted: true }, { where: { MenuGrp_PK: id } });
  }
}

module.exports = new MenuGroupRepository();
